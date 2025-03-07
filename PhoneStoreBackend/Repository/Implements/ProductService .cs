using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository.Implements
{
    public class ProductService : IProductRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ProductService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ICollection<ProductResponse>> GetAllAsync()
        {
            var list = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.Discount)
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.ProductSpecifications)
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.Reviews)
                .Select(p => new ProductResponse
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Category = new CategoryRespone
                    {
                        CategoryId = p.CategoryId,
                        Name = p.Category.Name,
                    },
                    Brand = new BrandResponse
                    {
                        BrandId = p.BrandId,
                        Name = p.Brand.Name,
                    },
                    ProductVariants = p.ProductVariants.Select(v => new ProductVariantResponse
                    {
                        VariantId = v.ProductVariantId,
                        Slug = v.Slug,
                        VariantName = v.VariantName,
                        DiscountPercentage = v.Discount != null ? v.Discount.Percentage : 0,
                        Price = v.Price,
                        Color = v.Color,
                        ImageUrl = v.ImageUrl,

                        ReviewRate = v.Reviews.Any() ? v.Reviews.Average(r => (double?)r.Rating) ?? 5 : 5,

                        RAM = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "dung lượng ram")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",

                        ScreenSize = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "kích thước màn hình")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",

                        Storage = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "ổ cứng" ||
                                           spec.Key.ToLower() == "bộ nhớ trong")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? ""
                    }).ToList(),
                })
                .ToListAsync(); // Chỉ gọi ToListAsync() một lần duy nhất

            return list;
        }

        public async Task<ICollection<ProductResponse>> Get15ProductOfCategoryName(string categoryName)
        {
            if (string.IsNullOrWhiteSpace(categoryName))
            {
                throw new ArgumentException("Category name cannot be null or empty.", nameof(categoryName));
            }

            const string RAM_KEY = "dung lượng ram";
            const string SCREEN_SIZE_KEY = "kích thước màn hình";
            const string STORAGE_KEY_1 = "ổ cứng";
            const string STORAGE_KEY_2 = "bộ nhớ trong";

            try
            {
                var findCategory = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == categoryName.ToLower());

                if (findCategory == null)
                {
                    return new List<ProductResponse>();
                }

                var list = await _context.Products
                    .Where(p => p.CategoryId == findCategory.CategoryId)
                    .OrderBy(p => p.ProductId) // Thêm sắp xếp mặc định
                    .Take(15)
                    .Select(p => new ProductResponse
                    {
                        ProductId = p.ProductId,
                        Name = p.Name,
                        Category = new CategoryRespone
                        {
                            CategoryId = p.CategoryId,
                            Name = p.Category.Name,
                        },
                        Brand = new BrandResponse
                        {
                            BrandId = p.BrandId,
                            Name = p.Brand.Name,
                        },
                        ProductVariants = p.ProductVariants.Select(v => new ProductVariantResponse
                        {
                            VariantId = v.ProductVariantId,
                            Slug = v.Slug,
                            VariantName = v.VariantName,
                            DiscountPercentage = v.Discount != null && v.Discount.IsActive ? v.Discount.Percentage : 0,
                            Price = v.Price,
                            Color = v.Color,
                            ImageUrl = v.ImageUrl,
                            CategoryName = p.Category.Name,
                            BrandName = p.Brand.Name,
                            ReviewRate = v.Reviews.Any() ? v.Reviews.Average(r => (double?)r.Rating) ?? 0 : 0, 
                            RAM = v.ProductSpecifications
                                .Where(spec => spec.Key.ToLower() == RAM_KEY)
                                .Select(spec => spec.Value)
                                .FirstOrDefault() ?? "",
                            ScreenSize = v.ProductSpecifications
                                .Where(spec => spec.Key.ToLower() == SCREEN_SIZE_KEY)
                                .Select(spec => spec.Value)
                                .FirstOrDefault() ?? "",
                            Storage = v.ProductSpecifications
                                .Where(spec => spec.Key.ToLower() == STORAGE_KEY_1 || spec.Key.ToLower() == STORAGE_KEY_2)
                                .Select(spec => spec.Value)
                                .FirstOrDefault() ?? ""
                        }).Take(1).ToList() 
                    })
                    .ToListAsync();

                return list;
            }
            catch (Exception ex)
            {
                // Log lỗi ở đây nếu có ILogger
                throw new Exception($"Error retrieving products for category '{categoryName}': {ex.Message}", ex);
            }
        }

        public async Task<ICollection<ProductResponse>> Get15ProductOfCategoryName(ICollection<string> listCategoryName)
        {
            const string RAM_KEY = "dung lượng ram";
            const string SCREEN_SIZE_KEY = "kích thước màn hình";
            const string STORAGE_KEY_1 = "ổ cứng";
            const string STORAGE_KEY_2 = "bộ nhớ trong";

            try
            {
                // Lấy danh mục theo danh sách tên
                var findCategories = await _context.Categories
                    .Where(c => listCategoryName.Contains(c.Name.ToLower()))
                    .ToListAsync();

                if (!findCategories.Any())
                {
                    return new List<ProductResponse>();
                }

                var categoryIds = findCategories.Select(c => c.CategoryId).ToList();

                // Lấy toàn bộ sản phẩm, đảm bảo Include() đầy đủ
                var products = await _context.Products
                    .Where(p => categoryIds.Contains(p.CategoryId))
                    .Include(p => p.Category) // Đảm bảo Category không null
                    .Include(p => p.Brand) // Đảm bảo Brand không null
                    .Include(p => p.ProductVariants)
                        .ThenInclude(v => v.ProductSpecifications)
                    .Include(p => p.ProductVariants)
                        .ThenInclude(v => v.Reviews)
                    .OrderBy(p => p.ProductId)
                    .ToListAsync();

                // Kiểm tra nếu danh sách sản phẩm trống
                if (!products.Any())
                {
                    return new List<ProductResponse>();
                }

                // Nhóm sản phẩm theo danh mục và lấy 15 sản phẩm đầu mỗi nhóm
                var groupedProducts = products
                    .GroupBy(p => p.CategoryId)
                    .SelectMany(g => g.Take(15))
                    .ToList();

                // Convert danh sách sản phẩm sang ProductResponse
                var list = groupedProducts.Select(p => new ProductResponse
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Category = new CategoryRespone
                    {
                        CategoryId = p.Category?.CategoryId ?? 0, // Tránh lỗi null
                        Name = p.Category?.Name ?? "Unknown"
                    },
                    Brand = new BrandResponse
                    {
                        BrandId = p.Brand?.BrandId ?? 0, // Tránh lỗi null
                        Name = p.Brand?.Name ?? "Unknown"
                    },
                    ProductVariants = p.ProductVariants?.Select(v => new ProductVariantResponse
                    {
                        VariantId = v.ProductVariantId,
                        Slug = v.Slug,
                        VariantName = v.VariantName,
                        DiscountPercentage = v.Discount != null && v.Discount.IsActive ? v.Discount.Percentage : 0,
                        Price = v.Price,
                        Color = v.Color,
                        ImageUrl = v.ImageUrl,
                        CategoryName = p.Category?.Name ?? "Unknown",
                        BrandName = p.Brand?.Name ?? "Unknown",
                        ReviewRate = v.Reviews?.Any() == true ? v.Reviews.Average(r => (double?)r.Rating) ?? 0 : 0,
                        RAM = v.ProductSpecifications?
                            .FirstOrDefault(spec => spec.Key.ToLower() == RAM_KEY)?.Value ?? "",
                        ScreenSize = v.ProductSpecifications?
                            .FirstOrDefault(spec => spec.Key.ToLower() == SCREEN_SIZE_KEY)?.Value ?? "",
                        Storage = v.ProductSpecifications?
                            .FirstOrDefault(spec => spec.Key.ToLower() == STORAGE_KEY_1 || spec.Key.ToLower() == STORAGE_KEY_2)
                            ?.Value ?? ""
                    }).Take(1).ToList() ?? new List<ProductVariantResponse>()
                }).ToList();

                return list;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving products: {ex.Message}", ex);
            }
        }


        public async Task<ICollection<ProductResponse>> GetAllProductOfLaptop()
        {
            var categoryLaptop = await _context.Categories
                .FirstOrDefaultAsync(c => c.Name.ToLower() == "laptop");

            if (categoryLaptop == null)
            {
                return new List<ProductResponse>();
            }

            var list = await _context.Products
                .Where(p => p.CategoryId == categoryLaptop.CategoryId)
                .Take(15)
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.Reviews)
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.Discount)
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.ProductSpecifications)
                .Select(p => new ProductResponse
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Category = new CategoryRespone
                    {
                        CategoryId = p.CategoryId,
                        Name = p.Category.Name,
                    },
                    Brand = new BrandResponse
                    {
                        BrandId = p.BrandId,
                        Name = p.Brand.Name,
                    },
                    ProductVariants = p.ProductVariants.Select(v => new ProductVariantResponse
                    {
                        VariantId = v.ProductVariantId,
                        Slug = v.Slug,
                        VariantName = v.VariantName,
                        DiscountPercentage = v.Discount != null ? v.Discount.Percentage : 0,
                        Price = v.Price,
                        Color = v.Color,
                        ImageUrl = v.ImageUrl,
                        ReviewRate = v.Reviews.Any() ? v.Reviews.Average(r => (double?)r.Rating) ?? 5 : 5,
                        RAM = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "dung lượng ram")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",

                        ScreenSize = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "kích thước màn hình")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",

                        Storage = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "ổ cứng" ||
                                           spec.Key.ToLower() == "bộ nhớ trong")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? ""
                    }).ToList(),
                })
                .ToListAsync();

            return list;
        }




        public async Task<ICollection<ProductResponse>> GetAllProductOfMobile()
        {
            var categoryMobile = await _context.Categories
                .FirstOrDefaultAsync(c => c.Name.ToLower() == "điện thoại".ToLower());


            if (categoryMobile == null)
            {
                return new List<ProductResponse>();
            }

            var list = await _context.Products
                .Where(p => p.CategoryId == categoryMobile.CategoryId)
                .Take(15)
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.Reviews)
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.Discount)
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.ProductSpecifications)
                
                .Select(p => new ProductResponse
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Category = new CategoryRespone
                    {
                        CategoryId = p.CategoryId,
                        Name = p.Category.Name,
                    },
                    Brand = new BrandResponse
                    {
                        BrandId = p.BrandId,
                        Name = p.Brand.Name,
                    },
                    ProductVariants = p.ProductVariants.Select(v => new ProductVariantResponse
                    {
                        VariantId = v.ProductVariantId,
                        Slug = v.Slug,
                        VariantName = v.VariantName,
                        DiscountPercentage = v.Discount != null ? v.Discount.Percentage : 0,
                        Price = v.Price,
                        Color = v.Color,
                        ImageUrl = v.ImageUrl,
                        ReviewRate = v.Reviews.Any() ? v.Reviews.Average(r => (double?)r.Rating) ?? 5 : 5,
                        RAM = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "dung lượng ram")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",

                        ScreenSize = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "kích thước màn hình")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",

                        Storage = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "ổ cứng" ||
                                           spec.Key.ToLower() == "bộ nhớ trong")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? ""
                    }).ToList(),
                })
                .ToListAsync();

            return list;
        }

        // Lấy sản phẩm theo ID
        public async Task<ProductDTO> GetProductByIdAsync(int id)
        {
            var product = await _context.Products.Include(p => p.Category).Include(p => p.Brand).FirstOrDefaultAsync(p => p.ProductId == id);
            if (product == null)
            {
                throw new KeyNotFoundException($"Product with id {id} not found.");
            }
            return _mapper.Map<ProductDTO>(product);
        }

        public async Task<ICollection<ProductResponse>> GetSimilarProductsAsync(int productId, int limit = 15)
        {
            // Lấy sản phẩm hiện tại
            var currentProduct = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .FirstOrDefaultAsync(p => p.ProductId == productId);

            if (currentProduct == null)
            {
                throw new KeyNotFoundException($"Product with id {productId} not found.");
            }

            var list = await _context.Products
                .Where(p => p.CategoryId == currentProduct.CategoryId && p.ProductId != productId)
                .Take(limit)
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.Reviews)
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.Discount)
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.ProductSpecifications)
                .Select(p => new ProductResponse
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Category = new CategoryRespone
                    {
                        CategoryId = p.CategoryId,
                        Name = p.Category.Name,
                    },
                    Brand = new BrandResponse
                    {
                        BrandId = p.BrandId,
                        Name = p.Brand.Name,
                    },
                    ProductVariants = p.ProductVariants.Select(v => new ProductVariantResponse
                    {
                        VariantId = v.ProductVariantId,
                        Slug = v.Slug,
                        VariantName = v.VariantName,
                        DiscountPercentage = v.Discount != null ? v.Discount.Percentage : 0,
                        Price = v.Price,
                        Color = v.Color,
                        ImageUrl = v.ImageUrl,
                        ReviewRate = v.Reviews.Any() ? v.Reviews.Average(r => (double?)r.Rating) ?? 5 : 5,
                        RAM = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "dung lượng ram")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",

                        ScreenSize = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "kích thước màn hình")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",

                        Storage = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "ổ cứng" ||
                                           spec.Key.ToLower() == "bộ nhớ trong")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? ""
                    }).ToList(),
                })
                .ToListAsync();

            return list;
        }


        // Thêm mới một sản phẩm
        public async Task<ProductDTO> AddProductAsync(Product product)
        {
            var newProduct = await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return _mapper.Map<ProductDTO>(newProduct.Entity);
        }

        // Cập nhật thông tin sản phẩm
        public async Task<bool> UpdateProductAsync(int id, Product updatedProduct)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                throw new KeyNotFoundException($"Product with id {id} not found.");
            }

            product.Name = updatedProduct.Name;
            product.Description = updatedProduct.Description;
            product.CategoryId = updatedProduct.CategoryId;
            product.BrandId = updatedProduct.BrandId;

            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return true;
        }

        // Xóa sản phẩm
        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                throw new KeyNotFoundException("not found.");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        // Tìm kiếm sản phẩm theo tên
        public async Task<PagedResponse<ICollection<ProductVariantResponse>>> SearchProductsAsync(
            string keyword,
            int page,
            int pageSize,
            string? sort,
            Dictionary<string, string>? filters
            )
        {
            var query = _context.ProductVariants
                .Where(pv => pv.VariantName.ToLower().Contains(keyword.ToLower()))
                .Include(pv => pv.Product)
                .Include(pv => pv.Discount)
                .Include(pv => pv.ProductSpecifications)
                .Include(pv => pv.Reviews)
                .AsQueryable(); // Chuyển về IQueryable để áp dụng filter/sort

            if (filters != null)
            {
                foreach (var filter in filters)
                {
                    var key = filter.Key.ToLower();
                    var value = filter.Value.ToLower();

                    if (key == "brand")
                        query = query.Where(pv => pv.Product.Brand.Name.ToLower().Contains(value)); // So sánh gần đúng

                    if (key == "ram")
                        query = query.Where(pv => pv.ProductSpecifications
                            .Any(spec => spec.Key.ToLower() == "dung lượng ram" && spec.Value.ToLower().Contains(value))); // So sánh gần đúng

                    if (key == "storage")
                        query = query.Where(pv => pv.ProductSpecifications
                            .Any(spec => (spec.Key.ToLower() == "ổ cứng" || spec.Key.ToLower() == "bộ nhớ trong")
                                         && spec.Value.ToLower().Contains(value))); // So sánh gần đúng
                }
            }


            query = sort switch
            {
                "price_asc" => query.OrderBy(pv => pv.Price * (1 - pv.Discount.Percentage / 100)),
                "price_desc" => query.OrderByDescending(pv => pv.Price * (1 - pv.Discount.Percentage / 100)),
                "name_asc" => query.OrderBy(pv => pv.VariantName),
                "name_desc" => query.OrderByDescending(pv => pv.VariantName),
                _ => query
            };


            // ✅ Phân trang
            var totalItems = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(v => new ProductVariantResponse
                {
                    VariantId = v.ProductVariantId,
                    Slug = v.Slug,
                    VariantName = v.VariantName,
                    DiscountPercentage = v.Discount != null ? v.Discount.Percentage : 0,
                    Price = v.Price,
                    Color = v.Color,
                    ImageUrl = v.ImageUrl,
                    ReviewRate = v.Reviews.Any() ? v.Reviews.Average(r => (double?)r.Rating) ?? 5 : 5,
                    RAM = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "dung lượng ram")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",
                    ScreenSize = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "kích thước màn hình")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",
                    Storage = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == "ổ cứng" ||
                                           spec.Key.ToLower() == "bộ nhớ trong")
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? ""
                })
                .ToListAsync();

            return PagedResponse<ICollection<ProductVariantResponse>>.CreatePagedResponse(items, page, pageSize, totalItems, "Danh sách tìm kiếm");
        }



        // Get variant list
        public async Task<ICollection<ProductVariantDTO>> GetProductVariantsAsync(int productId)
        {
            var variants = await _context.ProductVariants
            .Where(v => v.ProductId == productId)
            .ToListAsync();

            return variants.Select(p => _mapper.Map<ProductVariantDTO>(p)).ToList();
        }

        public async Task<PagedResponse<ICollection<ProductVariantResponse>>> GetAllProductOfCategoryName(
            string categoryName,
            int page = 1,
            int pageSize = 15,
            string? sort = null,
            Dictionary<string, string>? filters = null)
        {
            if (string.IsNullOrWhiteSpace(categoryName))
            {
                throw new ArgumentException("Category name cannot be null or empty.", nameof(categoryName));
            }

            if (page < 1 || pageSize < 1)
            {
                throw new ArgumentException("Page and pageSize must be greater than 0.");
            }

            const string RAM_KEY = "dung lượng ram";
            const string SCREEN_SIZE_KEY = "kích thước màn hình";
            const string STORAGE_KEY_1 = "ổ cứng";
            const string STORAGE_KEY_2 = "bộ nhớ trong";

            try
            {
                // Cơ bản truy vấn
                var query = _context.ProductVariants
                    .Where(pv => pv.Product.Category.Name.ToLower() == categoryName.ToLower());

                // Áp dụng bộ lọc (filters)
                if (filters != null && filters.Any())
                {
                    foreach (var filter in filters)
                    {
                        switch (filter.Key.ToLower())
                        {
                            case "price":
                                if (!string.IsNullOrEmpty(filter.Value))
                                {
                                    var priceRange = filter.Value.Split('-');
                                    if (priceRange.Length == 2 &&
                                        decimal.TryParse(priceRange[0], out var minPrice) &&
                                        decimal.TryParse(priceRange[1], out var maxPrice))
                                    {
                                        query = query.Where(pv =>
                                            (pv.Price * (1 - (pv.Discount != null && pv.Discount.IsActive ? pv.Discount.Percentage / 100m : 0)))
                                            >= minPrice &&
                                            (pv.Price * (1 - (pv.Discount != null && pv.Discount.IsActive ? pv.Discount.Percentage / 100m : 0)))
                                            <= maxPrice);
                                    }
                                }
                                break;
                        }
                    }
                }


                // Đếm tổng số bản ghi sau khi áp dụng bộ lọc
                var totalItems = await query.CountAsync();

                // Áp dụng sắp xếp (sort)
                switch (sort?.ToLower())
                {
                    case "price_asc":
                        query = query.OrderBy(pv => pv.Price * (1 - (pv.Discount != null && pv.Discount.IsActive ? pv.Discount.Percentage / 100m : 0)));
                        break;
                    case "price_desc":
                        query = query.OrderByDescending(pv => pv.Price * (1 - (pv.Discount != null && pv.Discount.IsActive ? pv.Discount.Percentage / 100m : 0)));
                        break;
                    default:
                        query = query.OrderBy(pv => pv.ProductVariantId);
                        break;
                }


                // Áp dụng phân trang và ánh xạ kết quả
                var result = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(v => new ProductVariantResponse
                    {
                        VariantId = v.ProductVariantId,
                        Slug = v.Slug,
                        VariantName = v.VariantName,
                        DiscountPercentage = v.Discount != null && v.Discount.IsActive ? v.Discount.Percentage : 0,
                        Price = v.Price,
                        Color = v.Color,
                        ImageUrl = v.ImageUrl,
                        CategoryName = v.Product.Category.Name,
                        BrandName = v.Product.Brand.Name,
                        ImportPrice = v.ImportPrice,
                        Stock = v.Stock,
                        ReviewRate = v.Reviews.Any() ? v.Reviews.Average(r => (double?)r.Rating) ?? 0 : 0,
                        RAM = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == RAM_KEY)
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",
                        ScreenSize = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == SCREEN_SIZE_KEY)
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",
                        Storage = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == STORAGE_KEY_1 || spec.Key.ToLower() == STORAGE_KEY_2)
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? ""
                    })
                    .ToListAsync();

                // Tạo phản hồi phân trang
                return PagedResponse<ICollection<ProductVariantResponse>>.CreatePagedResponse(
                    data: result,
                    currentPage: page,
                    pageSize: pageSize,
                    totalItems: totalItems,
                    message: $"Danh sách sản phẩm của danh mục '{categoryName}'"
                );
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving products for category '{categoryName}': {ex.Message}", ex);
            }
        }

        public async Task<PagedResponse<ICollection<ProductVariantResponse>>> GetAllProductOfBrandName(
            string brandName,
            int page = 1,
            int pageSize = 15,
            string? sort = null,
            Dictionary<string, string>? filters = null)
        {
            if (string.IsNullOrWhiteSpace(brandName))
            {
                throw new ArgumentException("Brand name cannot be null or empty.", nameof(brandName));
            }

            if (page < 1 || pageSize < 1)
            {
                throw new ArgumentException("Page and pageSize must be greater than 0.");
            }

            const string RAM_KEY = "dung lượng ram";
            const string SCREEN_SIZE_KEY = "kích thước màn hình";
            const string STORAGE_KEY_1 = "ổ cứng";
            const string STORAGE_KEY_2 = "bộ nhớ trong";

            try
            {
                // Cơ bản truy vấn
                var query = _context.ProductVariants
                    .Where(pv => pv.Product.Brand.Name.ToLower() == brandName.ToLower());

                // Áp dụng bộ lọc (filters)
                if (filters != null && filters.Any())
                {
                    foreach (var filter in filters)
                    {
                        switch (filter.Key.ToLower())
                        {
                            case "price":
                                if (!string.IsNullOrEmpty(filter.Value))
                                {
                                    var priceRange = filter.Value.Split('-');
                                    if (priceRange.Length == 2 &&
                                        decimal.TryParse(priceRange[0], out var minPrice) &&
                                        decimal.TryParse(priceRange[1], out var maxPrice))
                                    {
                                        query = query.Where(pv => pv.Price >= minPrice && pv.Price <= maxPrice);
                                    }
                                }
                                break;

                        }
                    }
                }

                // Đếm tổng số bản ghi sau khi áp dụng bộ lọc
                var totalItems = await query.CountAsync();

                // Áp dụng sắp xếp (sort)
                switch (sort?.ToLower())
                {
                    case "price_asc":
                        query = query.OrderBy(pv => pv.Price * (1 - (pv.Discount != null && pv.Discount.IsActive ? pv.Discount.Percentage / 100m : 0)));
                        break;
                    case "price_desc":
                        query = query.OrderByDescending(pv => pv.Price * (1 - (pv.Discount != null && pv.Discount.IsActive ? pv.Discount.Percentage / 100m : 0)));
                        break;
                    default:
                        query = query.OrderBy(pv => pv.ProductVariantId);
                        break;
                }


                // Áp dụng phân trang và ánh xạ kết quả
                var result = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(v => new ProductVariantResponse
                    {
                        VariantId = v.ProductVariantId,
                        Slug = v.Slug,
                        VariantName = v.VariantName,
                        DiscountPercentage = v.Discount != null && v.Discount.IsActive ? v.Discount.Percentage : 0,
                        Price = v.Price,
                        Color = v.Color,
                        ImageUrl = v.ImageUrl,
                        CategoryName = v.Product.Category.Name,
                        BrandName = v.Product.Brand.Name,
                        ImportPrice = v.ImportPrice,
                        Stock = v.Stock,
                        ReviewRate = v.Reviews.Any() ? v.Reviews.Average(r => (double?)r.Rating) ?? 0 : 0,
                        RAM = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == RAM_KEY)
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",
                        ScreenSize = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == SCREEN_SIZE_KEY)
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? "",
                        Storage = v.ProductSpecifications
                            .Where(spec => spec.Key.ToLower() == STORAGE_KEY_1 || spec.Key.ToLower() == STORAGE_KEY_2)
                            .Select(spec => spec.Value)
                            .FirstOrDefault() ?? ""
                    })
                    .ToListAsync();

                // Tạo phản hồi phân trang
                return PagedResponse<ICollection<ProductVariantResponse>>.CreatePagedResponse(
                    data: result,
                    currentPage: page,
                    pageSize: pageSize,
                    totalItems: totalItems,
                    message: $"Danh sách sản phẩm của thương hiệu '{brandName}'"
                );
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving products for brand '{brandName}': {ex.Message}", ex);
            }
        }

        
    }
}
