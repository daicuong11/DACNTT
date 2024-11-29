using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface ICouponRepository
    {
        Task<ICollection<CouponDTO>> GetAllAsync();
        Task<CouponDTO> GetCouponByIdAsync(int couponId);
        Task<CouponDTO> GetCouponByCodeAsync(string code);
        Task<CouponDTO> AddCouponAsync(Coupon coupon);
        Task<bool> UpdateCouponAsync(int couponId, Coupon coupon);
        Task<bool> DeleteCouponAsync(int couponId);
        Task<bool> ValidateCouponAsync(string code, decimal orderAmount);
    }
}
