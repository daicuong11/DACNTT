using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IProductRepository
    {
        Task<ICollection<ProductResponse>> GetAllAsync();
        Task<ICollection<ProductResponse>> Get15ProductOfCategoryName(string categoryName);

        Task<PagedResponse<ICollection<ProductVariantResponse>>> GetAllProductOfCategoryName(string categoryName, int page = 1, int pageSize = 15, string? sort = null, Dictionary<string, string>? filters = null);
        Task<PagedResponse<ICollection<ProductVariantResponse>>> GetAllProductOfBrandName(string brandName, int page = 1, int pageSize = 15, string? sort = null, Dictionary<string, string>? filters = null);

        Task<ICollection<ProductResponse>> GetAllProductOfMobile();
        Task<ICollection<ProductResponse>> GetAllProductOfLaptop();

        Task<ProductDTO> GetProductByIdAsync(int id);
        Task<ICollection<ProductResponse>> GetSimilarProductsAsync(int productId, int limit = 15);
        Task<ProductDTO> AddProductAsync(Product product);
        Task<bool> UpdateProductAsync(int id, Product updatedProduct);
        Task<bool> DeleteProductAsync(int id);
        Task<PagedResponse<ICollection<ProductVariantResponse>>> SearchProductsAsync(
            string keyword,
            int page,
            int pageSize,
            string? sort,
            Dictionary<string, string>? filters
            );
        Task<ICollection<ProductVariantDTO>> GetProductVariantsAsync(int productId);

    }
}
