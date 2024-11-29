using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class CouponService : ICouponRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CouponService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả các Coupon
        public async Task<ICollection<CouponDTO>> GetAllAsync()
        {
            var coupons = await _context.Coupons.ToListAsync();
            return coupons.Select(c => _mapper.Map<CouponDTO>(c)).ToList();
        }

        // Lấy Coupon theo CouponId
        public async Task<CouponDTO> GetCouponByIdAsync(int couponId)
        {
            var coupon = await _context.Coupons.FirstOrDefaultAsync(c => c.CouponId == couponId);
            if (coupon == null)
            {
                throw new Exception("Coupon not found.");
            }
            return _mapper.Map<CouponDTO>(coupon);
        }

        // Lấy Coupon theo mã
        public async Task<CouponDTO> GetCouponByCodeAsync(string code)
        {
            var coupon = await _context.Coupons.FirstOrDefaultAsync(c => c.Code == code);
            if (coupon == null)
            {
                throw new Exception("Coupon not found.");
            }
            return _mapper.Map<CouponDTO>(coupon);
        }

        // Thêm Coupon mới
        public async Task<CouponDTO> AddCouponAsync(Coupon coupon)
        {
            var newCoupon = await _context.Coupons.AddAsync(coupon);
            await _context.SaveChangesAsync();
            return _mapper.Map<CouponDTO>(newCoupon.Entity);
        }

        // Cập nhật Coupon
        public async Task<bool> UpdateCouponAsync(int couponId, Coupon coupon)
        {
            var existingCoupon = await _context.Coupons.FindAsync(couponId);
            if (existingCoupon == null)
            {
                throw new Exception("Coupon not found.");
            }

            existingCoupon.Code = coupon.Code;
            existingCoupon.IsPercentage = coupon.IsPercentage;
            existingCoupon.DiscountValue = coupon.DiscountValue;
            existingCoupon.MinimumOrderAmount = coupon.MinimumOrderAmount;
            existingCoupon.MaxUsageCount = coupon.MaxUsageCount;
            existingCoupon.StartDate = coupon.StartDate;
            existingCoupon.EndDate = coupon.EndDate;
            existingCoupon.IsActive = coupon.IsActive;

            _context.Coupons.Update(existingCoupon);
            await _context.SaveChangesAsync();

            return true;
        }

        // Xóa Coupon
        public async Task<bool> DeleteCouponAsync(int couponId)
        {
            var coupon = await _context.Coupons.FindAsync(couponId);
            if (coupon == null)
            {
                throw new Exception("Coupon not found.");
            }

            _context.Coupons.Remove(coupon);
            await _context.SaveChangesAsync();

            return true;
        }

        // Kiểm tra tính hợp lệ của Coupon
        public async Task<bool> ValidateCouponAsync(string code, decimal orderAmount)
        {
            var coupon = await _context.Coupons.FirstOrDefaultAsync(c => c.Code == code);
            if (coupon == null || !coupon.IsActive || coupon.EndDate < DateTime.Now || coupon.StartDate > DateTime.Now)
            {
                return false;
            }

            if (coupon.MinimumOrderAmount.HasValue && orderAmount < coupon.MinimumOrderAmount.Value)
            {
                return false;
            }

            if (coupon.MaxUsageCount.HasValue && coupon.UsedCount >= coupon.MaxUsageCount.Value)
            {
                return false;
            }

            return true;
        }
    }
}
