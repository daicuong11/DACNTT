using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository.Implements
{
    public class DiscountService : IDiscountRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public DiscountService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả các Discount
        public async Task<ICollection<DiscountDTO>> GetAllAsync()
        {
            var discounts = await _context.Discounts.ToListAsync();
            return discounts.Select(d => _mapper.Map<DiscountDTO>(d)).ToList();
        }

        // Lấy Discount theo DiscountId
        public async Task<DiscountDTO> GetDiscountByIdAsync(int discountId)
        {
            var discount = await _context.Discounts.FirstOrDefaultAsync(d => d.DiscountId == discountId);
            if (discount == null)
            {
                throw new KeyNotFoundException("Discount not found.");
            }
            return _mapper.Map<DiscountDTO>(discount);
        }

        // Thêm Discount mới
        public async Task<DiscountDTO> AddDiscountAsync(Discount discount)
        {
            var newDiscount = await _context.Discounts.AddAsync(discount);
            await _context.SaveChangesAsync();
            return _mapper.Map<DiscountDTO>(newDiscount.Entity);
        }

        // Cập nhật Discount
        public async Task<bool> UpdateDiscountAsync(int discountId, Discount discount)
        {
            var existingDiscount = await _context.Discounts.FindAsync(discountId);
            if (existingDiscount == null)
            {
                throw new KeyNotFoundException("Discount not found.");
            }

            existingDiscount.Percentage = discount.Percentage;
            existingDiscount.IsActive = discount.IsActive;

            _context.Discounts.Update(existingDiscount);
            await _context.SaveChangesAsync();

            return true;
        }

        // Xóa Discount
        public async Task<bool> DeleteDiscountAsync(int discountId)
        {
            var discount = await _context.Discounts.FindAsync(discountId);
            if (discount == null)
            {
                throw new KeyNotFoundException("Discount not found.");
            }

            _context.Discounts.Remove(discount);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
