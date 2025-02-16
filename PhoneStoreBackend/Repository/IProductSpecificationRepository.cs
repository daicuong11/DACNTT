using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IProductSpecificationRepository
    {
        Task<ICollection<ProductSpecificationDTO>> GetAllProductSpecificationsAsync();
        Task<ProductSpecificationDTO> GetProductSpecificationByIdAsync(int specificationId);
        Task<ICollection<ProductSpecificationGroupDTO>> GetProductSpecificationsByVariantIdAsync(int variantId);
        Task<ICollection<ProductSpecificationDTO>> GetProductSpecificationsSpecialByVariantIdAsync(int variantId);

        Task<ProductSpecificationDTO> AddProductSpecificationAsync(ProductSpecification productSpecification);
        Task<bool> UpdateProductSpecificationAsync(int specificationId, ProductSpecification productSpecification);
        Task<bool> DeleteProductSpecificationAsync(int specificationId);
    }
}
