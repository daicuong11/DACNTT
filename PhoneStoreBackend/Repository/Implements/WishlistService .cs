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
            return _mapper.Map<ICollection<WishlistDTO>>(wishlists);
        }

        // Lấy wishlist theo WishlistId
        public async Task<WishlistDTO> GetWishlistByIdAsync(int wishlistId)
        {
            var wishlist = await _context.Wishlists.FirstOrDefaultAsync(w => w.WishlistId == wishlistId);
            if (wishlist == null)
            {
                throw new KeyNotFoundException("Wishlist not found.");
            }
            return _mapper.Map<WishlistDTO>(wishlist);
        }

        // Lấy wishlist theo UserId
        public async Task<ICollection<WishlistDTO>> GetWishlistByUserIdAsync(int userId)
        {
            var wishlists = await _context.Wishlists
                .Where(w => w.UserId == userId)
                .ToListAsync();

            return _mapper.Map<ICollection<WishlistDTO>>(wishlists);

        }

        // Thêm wishlist mới
        public async Task<WishlistDTO> AddWishlistAsync(Wishlist wishlist)
        {
            bool productExists = await _context.ProductVariants
                .AnyAsync(pv => pv.ProductVariantId == wishlist.ProductVariantId);

            if (!productExists)
            {
                throw new Exception("Sản phẩm không tồn tại. " + wishlist.ProductVariantId);
            }

            var existingWishlist = await _context.Wishlists
                .FirstOrDefaultAsync(w => w.UserId == wishlist.UserId && w.ProductVariantId == wishlist.ProductVariantId);

            if (existingWishlist != null)
            {
                _context.Wishlists.Remove(existingWishlist);
                await _context.SaveChangesAsync();
                return null;

            }

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
                throw new KeyNotFoundException("Wishlist not found.");
            }

            _context.Wishlists.Remove(wishlist);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<WishlistDTO?> GetWishlistByUserIdAndProductVariantIdAsync(int userId, int variantId)
        {
            var wishlist = await _context.Wishlists
                .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductVariantId == variantId);

            if (wishlist == null)
                return null;

            return _mapper.Map<WishlistDTO>(wishlist);
        }

    }
}
