using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IProductRepository
    {
        Task<ICollection<ProductResponse>> GetAllAsync();
        Task<ICollection<ProductResponse>> GetAllProductOfMobile();
        Task<ICollection<ProductResponse>> GetAllProductOfLaptop();

        Task<ProductDTO> GetProductByIdAsync(int id);
        Task<ICollection<ProductResponse>> GetSimilarProductsAsync(int productId, int limit = 15);
        Task<ProductDTO> AddProductAsync(Product product);
        Task<bool> UpdateProductAsync(int id, Product updatedProduct);
        Task<bool> DeleteProductAsync(int id);
        Task<ICollection<ProductResponse>> SearchProductsAsync(string keyword);
        Task<ICollection<ProductVariantDTO>> GetProductVariantsAsync(int productId);

    }
}
