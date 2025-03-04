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
    }
}
