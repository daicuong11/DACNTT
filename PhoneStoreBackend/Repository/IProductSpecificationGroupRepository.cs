using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IProductSpecificationGroupRepository
    {
        Task<List<ProductSpecificationGroupDTO>> GetAllProductSpecificationGroupsAsync();
        Task<ProductSpecificationGroupDTO> GetProductSpecificationGroupByIdAsync(int id);
        Task<ProductSpecificationGroupDTO> AddProductSpecificationGroupAsync(ProductSpecificationGroup specGroup);
        Task<List<ProductSpecificationGroupDTO>> AddListSpecOfACategoryAsync(List<ProductSpecificationGroup> listSpec);

    }
}
