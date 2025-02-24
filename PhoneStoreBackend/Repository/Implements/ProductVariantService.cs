using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository.Implements
{
    public class ProductVariantService : IProductVariantRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public ProductVariantService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProductVariantDTO> AddProductVariantAsync(ProductVariant productVariant)
        {
            var newProductVariant = await _context.ProductVariants.AddAsync(productVariant);
            await _context.SaveChangesAsync();
            return _mapper.Map<ProductVariantDTO>(newProductVariant.Entity);
        }

        public async Task<bool> AnySlugExistsAsync(string slug)
        {
            return await _context.ProductVariants.AnyAsync(pv => pv.Slug == slug);
        }

        public async Task<bool> DeleteProductVariantAsync(int id)
        {
            var findProductVariant = await _context.ProductVariants.FindAsync(id);
            if (findProductVariant == null)
            {
                throw new KeyNotFoundException($"ProductVariant with id {id} not found.");
            }
            _context.ProductVariants.Remove(findProductVariant);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ICollection<ProductVariantDTO>> GetAllAsync()
        {
            var productVariants = await _context.ProductVariants
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.Brand)
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.Category)
                .Include(pv => pv.Discount)
                .Include(v => v.ProductImages)
                .Include(v => v.ProductSpecifications)
                .ToListAsync();
            return _mapper.Map<List<ProductVariantDTO>>(productVariants);
        }

        public async Task<VariantBasicResponse> GetProductVariantById(int id)
        {
            var findProductVariant = await _context.ProductVariants
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.Brand)
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.Category)
                .Include(pv => pv.Discount)
                .Include(v => v.ProductImages)
                .Include(v => v.ProductSpecifications)
                .FirstOrDefaultAsync(p => p.ProductVariantId == id);

            if (findProductVariant == null)
            {
                throw new KeyNotFoundException($"ProductVariant with id {id} not found.");
            }

            return new VariantBasicResponse
            {
                ProductVariantId = findProductVariant.ProductVariantId,
                FullNameVariant = findProductVariant.VariantName,
                ProductId = findProductVariant.ProductId,
                Brand = findProductVariant.Product.Brand, 
                Category = findProductVariant.Product.Category,  
                Color = findProductVariant.Color,
                DiscountPercentage = findProductVariant.Discount?.Percentage ?? 0,
                ImageUrl = findProductVariant.ImageUrl,
                ImportPrice = findProductVariant.ImportPrice,
                Price = findProductVariant.Price,
                Slug = findProductVariant.Slug,
                Stock = findProductVariant.Stock,
                Storage = findProductVariant.Storage,
            };
        }


        public async Task<ProductVariantDTO> GetProductVariantBySlug(string slug)
        {
            var findProductVariant = await _context.ProductVariants
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.Category)
                .Include(pv => pv.Discount)
                .Include(v => v.ProductImages)
                .FirstOrDefaultAsync(p => p.Slug == slug);

            if (findProductVariant == null)
            {
                throw new KeyNotFoundException($"ProductVariant with slug: '{slug}' not found.");
            }
            return _mapper.Map<ProductVariantDTO>(findProductVariant);
        }


        public async Task<ICollection<ProductVariantResponse>> GetProductVariantByProductId(int id)
        {
            var listProductVariants = await _context.ProductVariants
                .Include(pv => pv.Discount)
                .Include(v => v.ProductImages)
                .Where(v => v.ProductId == id)
                .Select(v => new ProductVariantResponse
                {
                    VariantId = v.ProductVariantId,
                    Slug = v.Slug,
                    VariantName = v.VariantName,
                    DiscountPercentage = v.Discount != null ? v.Discount.Percentage : 0,
                    Price = v.Price,
                    Color = v.Color,
                    ImageUrl = v.ImageUrl,
                    Storage = v.Storage
                })
                .ToListAsync();
            return listProductVariants;
        }

        public async Task<ICollection<ProductVariantDTO>> GetAllProductVariantOfLaptop()
        {
            var categoryMobile = await _context.Categories
                .FirstOrDefaultAsync(c => c.Name.ToLower() == "laptop".ToLower());


            if (categoryMobile == null)
            {
                return new List<ProductVariantDTO>();
            }

            var listProductVariants = await _context.ProductVariants
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.Brand)
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.Category)
                .Include(pv => pv.Discount)
                .Include(v => v.ProductImages)
                .Include(v => v.ProductSpecifications)
                .Where(v => v.Product.Category.Name == categoryMobile.Name.Trim()) 
                .ToListAsync();

            return _mapper.Map<ICollection<ProductVariantDTO>>(listProductVariants);
        }


        public async Task<ICollection<ProductVariantDTO>> GetAllProductVariantOfMobile()
        {
            var categoryMobile = await _context.Categories
                .FirstOrDefaultAsync(c => c.Name.ToLower() == "điện thoại".ToLower());


            if (categoryMobile == null)
            {
                return new List<ProductVariantDTO>();
            }

            var listProductVariants = await _context.ProductVariants
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.Brand)
                .Include(pv => pv.Product)
                    .ThenInclude(p => p.Category)
                .Include(pv => pv.Discount)
                .Include(v => v.ProductImages)
                .Include(v => v.ProductSpecifications)
                .Where(v => v.Product.CategoryId == categoryMobile.CategoryId) 
                .ToListAsync();

            return _mapper.Map<ICollection<ProductVariantDTO>>(listProductVariants);
        }


        public async Task<bool> UpdateProductVariantAsync(int id, ProductVariant productVariant)
        {
            var findProductVariant = await _context.ProductVariants.FindAsync(id);
            if (findProductVariant == null)
            {
                throw new KeyNotFoundException($"ProductVariant with id {id} not found.");
            }

            findProductVariant.Stock = productVariant.Stock;
            findProductVariant.Storage = productVariant.Storage;
            findProductVariant.Price = productVariant.Price;
            findProductVariant.Color = productVariant.Color;
            findProductVariant.Discount = productVariant.Discount;

            _context.ProductVariants.Update(findProductVariant);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ICollection<ProductVariant>> GetProductVariantsByIds(List<int> productVariantIds)
        {
            if (productVariantIds == null || productVariantIds.Count == 0)
            {
                throw new ArgumentException("Danh sách productVariantIds không được rỗng.");
            }
            return await _context.ProductVariants
                .Where(pv => productVariantIds.Contains(pv.ProductVariantId))
                .Include(pv => pv.Discount)
                .ToListAsync();
        }
    }
}
