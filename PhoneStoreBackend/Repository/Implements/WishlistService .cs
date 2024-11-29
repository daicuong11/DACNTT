using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class WishlistService : IWishlistRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public WishlistService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả wishlist
        public async Task<ICollection<WishlistDTO>> GetAllWishlistsAsync()
        {
            var wishlists = await _context.Wishlists.ToListAsync();
            return wishlists.Select(w => _mapper.Map<WishlistDTO>(w)).ToList();
        }

        // Lấy wishlist theo WishlistId
        public async Task<WishlistDTO> GetWishlistByIdAsync(int wishlistId)
        {
            var wishlist = await _context.Wishlists.FirstOrDefaultAsync(w => w.WishlistId == wishlistId);
            if (wishlist == null)
            {
                throw new Exception("Wishlist not found.");
            }
            return _mapper.Map<WishlistDTO>(wishlist);
        }

        // Lấy wishlist theo UserId
        public async Task<WishlistDTO> GetWishlistByUserIdAsync(int userId)
        {
            var wishlist = await _context.Wishlists.FirstOrDefaultAsync(w => w.UserId == userId);
            if (wishlist == null)
            {
                throw new Exception("Wishlist not found.");
            }
            return _mapper.Map<WishlistDTO>(wishlist);
        }

        // Thêm wishlist mới
        public async Task<WishlistDTO> AddWishlistAsync(Wishlist wishlist)
        {
            var newWishlist = await _context.Wishlists.AddAsync(wishlist);
            await _context.SaveChangesAsync();
            return _mapper.Map<WishlistDTO>(newWishlist.Entity);
        }

        // Xóa wishlist
        public async Task<bool> DeleteWishlistAsync(int wishlistId)
        {
            var wishlist = await _context.Wishlists.FindAsync(wishlistId);
            if (wishlist == null)
            {
                throw new Exception("Wishlist not found.");
            }

            _context.Wishlists.Remove(wishlist);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
