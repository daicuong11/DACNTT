using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
                .Include(pv => pv.Discount)
                .ToListAsync();
            return _mapper.Map<List<ProductVariantDTO>>(productVariants);
        }

        public async Task<ProductVariantDTO> GetProductVariantById(int id)
        {
            var findProductVariant = await _context.ProductVariants.Include(p => p.Product).Include(p => p.Discount).FirstOrDefaultAsync(p => p.ProductVariantId == id);
            if (findProductVariant == null)
            {
                throw new KeyNotFoundException($"ProductVariant with id {id} not found.");
            }
            return _mapper.Map<ProductVariantDTO>(findProductVariant);
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
    }
}
