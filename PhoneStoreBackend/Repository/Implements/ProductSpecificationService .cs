using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class ProductSpecificationService : IProductSpecificationRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ProductSpecificationService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả các thông số kỹ thuật sản phẩm
        public async Task<ICollection<ProductSpecificationDTO>> GetAllProductSpecificationsAsync()
        {
            var productSpecifications = await _context.ProductSpecifications.ToListAsync();
            return productSpecifications.Select(ps => _mapper.Map<ProductSpecificationDTO>(ps)).ToList();
        }

        // Lấy thông số kỹ thuật sản phẩm theo SpecificationId
        public async Task<ProductSpecificationDTO> GetProductSpecificationByIdAsync(int specificationId)
        {
            var productSpecification = await _context.ProductSpecifications.FirstOrDefaultAsync(ps => ps.SpecificationId == specificationId);
            if (productSpecification == null)
            {
                throw new KeyNotFoundException("Product specification not found.");
            }
            return _mapper.Map<ProductSpecificationDTO>(productSpecification);
        }

        // Lấy các thông số kỹ thuật của sản phẩm theo ProductId
        public async Task<ICollection<ProductSpecificationDTO>> GetProductSpecificationsByProductIdAsync(int productVariantId)
        {
            var productSpecifications = await _context.ProductSpecifications.Where(ps => ps.ProductVariantId == productVariantId).ToListAsync();
            return productSpecifications.Select(ps => _mapper.Map<ProductSpecificationDTO>(ps)).ToList();
        }

        // Thêm thông số kỹ thuật cho sản phẩm
        public async Task<ProductSpecificationDTO> AddProductSpecificationAsync(ProductSpecification productSpecification)
        {
            var newProductSpecification = await _context.ProductSpecifications.AddAsync(productSpecification);
            await _context.SaveChangesAsync();
            return _mapper.Map<ProductSpecificationDTO>(newProductSpecification.Entity);
        }

        // Cập nhật thông số kỹ thuật sản phẩm
        public async Task<bool> UpdateProductSpecificationAsync(int specificationId, ProductSpecification productSpecification)
        {
            var existingProductSpecification = await _context.ProductSpecifications.FindAsync(specificationId);
            if (existingProductSpecification == null)
            {
                throw new KeyNotFoundException("Product specification not found.");
            }

            existingProductSpecification.Key = productSpecification.Key;
            existingProductSpecification.Value = productSpecification.Value;

            _context.ProductSpecifications.Update(existingProductSpecification);
            await _context.SaveChangesAsync();

            return true;
        }

        // Xóa thông số kỹ thuật của sản phẩm
        public async Task<bool> DeleteProductSpecificationAsync(int specificationId)
        {
            var productSpecification = await _context.ProductSpecifications.FindAsync(specificationId);
            if (productSpecification == null)
            {
                throw new KeyNotFoundException("Product specification not found.");
            }

            _context.ProductSpecifications.Remove(productSpecification);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
