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
                .Include(p => p.Category) // Include bảng Category
                .Include(p => p.Brand) // Include bảng Brand

                // Include ProductVariants và liên kết với các bảng con
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.ProductImages)

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
                    .ThenInclude(v => v.ProductImages)
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
                    .ThenInclude(v => v.ProductImages)
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
                    .ThenInclude(v => v.ProductImages)
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
        public async Task<ICollection<ProductResponse>> SearchProductsAsync(string keyword)
        {
            var products = await _context.Products
                .Where(p => p.Name.ToLower().Contains(keyword.ToLower()))
                .Include(p => p.Category) // Include bảng Category
                .Include(p => p.ProductVariants)
                .ThenInclude(v => v.Discount)
                .Select(p => new ProductResponse
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Category = new CategoryRespone
                    {
                        CategoryId = p.CategoryId,
                        Name = p.Category.Name,
                    },
                    ProductVariants = p.ProductVariants.Select(v => new ProductVariantResponse
                    {
                        VariantId = v.ProductVariantId,
                        DiscountPercentage = v.Discount != null ? v.Discount.Percentage : 0,
                        Slug = v.Slug,
                        VariantName = v.VariantName,
                        Price = v.Price,
                        Color = v.Color,
                        ImageUrl = v.ImageUrl,
                        CategoryName = p.Category.Name,
                    }).ToList(),
                })
                .ToListAsync();

            return products.Select(p => _mapper.Map<ProductResponse>(p)).ToList();
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
