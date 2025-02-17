using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IProductVariantRepository
    {
        Task<ICollection<ProductVariantDTO>> GetAllAsync();
        Task<VariantBasicResponse> GetProductVariantById(int id);
        Task<ProductVariantDTO> GetProductVariantBySlug(string slug);
        Task<ICollection<ProductVariantResponse>> GetProductVariantByProductId(int id);
        Task<ICollection<ProductVariantDTO>> GetAllProductVariantOfMobile();
        Task<ICollection<ProductVariantDTO>> GetAllProductVariantOfLaptop();
        Task<ProductVariantDTO> AddProductVariantAsync(ProductVariant productVariant);
        Task<bool> UpdateProductVariantAsync(int id, ProductVariant productVariant);
        Task<bool> DeleteProductVariantAsync(int id);
        Task<bool> AnySlugExistsAsync(string slug);
    }
}
