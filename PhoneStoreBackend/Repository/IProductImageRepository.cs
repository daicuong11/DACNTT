using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IProductImageRepository
    {
        Task<ICollection<ProductImageDTO>> GetAllProductImagesAsync();
        Task<ProductImageDTO> GetProductImageByIdAsync(int imageId);
        Task<ICollection<ProductImageDTO>> GetProductImagesByProductIdAsync(int productId);
        Task<ProductImageDTO> AddProductImageAsync(ProductImage productImage);
        Task<bool> UpdateProductImageAsync(int imageId, ProductImage productImage);
        Task<bool> DeleteProductImageAsync(int imageId);
    }
}
