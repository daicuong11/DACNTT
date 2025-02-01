using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class ProductImageService : IProductImageRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ProductImageService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả các hình ảnh sản phẩm
        public async Task<ICollection<ProductImageDTO>> GetAllProductImagesAsync()
        {
            var productImages = await _context.ProductImages.ToListAsync();
            return productImages.Select(pi => _mapper.Map<ProductImageDTO>(pi)).ToList();
        }

        // Lấy hình ảnh sản phẩm theo ImageId
        public async Task<ProductImageDTO> GetProductImageByIdAsync(int imageId)
        {
            var productImage = await _context.ProductImages.FirstOrDefaultAsync(pi => pi.ImageId == imageId);
            if (productImage == null)
            {
                throw new KeyNotFoundException("Product image not found.");
            }
            return _mapper.Map<ProductImageDTO>(productImage);
        }

        // Lấy hình ảnh sản phẩm theo ProductId
        public async Task<ICollection<ProductImageDTO>> GetProductImagesByProductIdAsync(int productVariantId)
        {
            var productImages = await _context.ProductImages.Where(pi => pi.ProductVariantId == productVariantId).ToListAsync();
            return productImages.Select(pi => _mapper.Map<ProductImageDTO>(pi)).ToList();
        }

        // Thêm hình ảnh sản phẩm
        public async Task<ProductImageDTO> AddProductImageAsync(ProductImage productImage)
        {
            var newProductImage = await _context.ProductImages.AddAsync(productImage);
            await _context.SaveChangesAsync();
            return _mapper.Map<ProductImageDTO>(newProductImage.Entity);
        }

        // Cập nhật hình ảnh sản phẩm
        public async Task<bool> UpdateProductImageAsync(int imageId, ProductImage productImage)
        {
            var existingProductImage = await _context.ProductImages.FindAsync(imageId);
            if (existingProductImage == null)
            {
                throw new KeyNotFoundException("Product image not found.");
            }

            existingProductImage.ImageUrl = productImage.ImageUrl;

            _context.ProductImages.Update(existingProductImage);
            await _context.SaveChangesAsync();

            return true;
        }

        // Xóa hình ảnh sản phẩm
        public async Task<bool> DeleteProductImageAsync(int imageId)
        {
            var productImage = await _context.ProductImages.FindAsync(imageId);
            if (productImage == null)
            {
                throw new KeyNotFoundException("Product image not found.");
            }

            _context.ProductImages.Remove(productImage);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
