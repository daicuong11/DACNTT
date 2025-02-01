using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class WishlistItemService : IWishlistItemRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public WishlistItemService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả wishlist items
        public async Task<ICollection<WishlistItemDTO>> GetAllWishlistItemsAsync()
        {
            var wishlistItems = await _context.WishlistItems.ToListAsync();
            return wishlistItems.Select(wi => _mapper.Map<WishlistItemDTO>(wi)).ToList();
        }

        // Lấy wishlist item theo WishlistItemId
        public async Task<WishlistItemDTO> GetWishlistItemByIdAsync(int wishlistItemId)
        {
            var wishlistItem = await _context.WishlistItems.FirstOrDefaultAsync(wi => wi.WishlistItemId == wishlistItemId);
            if (wishlistItem == null)
            {
                throw new KeyNotFoundException("Wishlist item not found.");
            }
            return _mapper.Map<WishlistItemDTO>(wishlistItem);
        }

        // Lấy wishlist items theo WishlistId
        public async Task<ICollection<WishlistItemDTO>> GetWishlistItemsByWishlistIdAsync(int wishlistId)
        {
            var wishlistItems = await _context.WishlistItems
                .Where(wi => wi.WishlistId == wishlistId)
                .ToListAsync();

            return wishlistItems.Select(wi => _mapper.Map<WishlistItemDTO>(wi)).ToList();
        }

        // Thêm wishlist item
        public async Task<WishlistItemDTO> AddWishlistItemAsync(WishlistItem wishlistItem)
        {
            var newWishlistItem = await _context.WishlistItems.AddAsync(wishlistItem);
            await _context.SaveChangesAsync();
            return _mapper.Map<WishlistItemDTO>(newWishlistItem.Entity);
        }

        // Xóa wishlist item
        public async Task<bool> DeleteWishlistItemAsync(int wishlistItemId)
        {
            var wishlistItem = await _context.WishlistItems.FindAsync(wishlistItemId);
            if (wishlistItem == null)
            {
                throw new KeyNotFoundException("Wishlist item not found.");
            }

            _context.WishlistItems.Remove(wishlistItem);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
