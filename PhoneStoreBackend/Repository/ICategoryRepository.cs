using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface ICategoryRepository
    {
        Task<ICollection<CategoryDTO>> GetAllAsync();
        Task<CategoryDTO> GetByIdAsync(int id);
        Task<CategoryDTO> AddAsync(Category category);
        Task<CategoryDTO> UpdateAsync(int id, Category category);
        Task<bool> DeleteAsync(int id);
    }
}
