using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IBrandRepository
    {
        Task<ICollection<BrandDTO>> GetAllAsync();
        Task<BrandDTO> GetBrandByIdAsync(int brandId);
        Task<BrandDTO> AddBrandAsync(Brand brand);
        Task<bool> UpdateBrandAsync(int brandId, Brand brand);
        Task<bool> DeleteBrandAsync(int brandId);
    }
}
