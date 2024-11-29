using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IDiscountRepository
    {
        Task<ICollection<DiscountDTO>> GetAllAsync();
        Task<DiscountDTO> GetDiscountByIdAsync(int discountId);
        Task<DiscountDTO> GetDiscountByCodeAsync(string code);
        Task<DiscountDTO> AddDiscountAsync(Discount discount);
        Task<bool> UpdateDiscountAsync(int discountId, Discount discount);
        Task<bool> DeleteDiscountAsync(int discountId);
        Task<bool> ValidateDiscountAsync(string code);
    }
}
