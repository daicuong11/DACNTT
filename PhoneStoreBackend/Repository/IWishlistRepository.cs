using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IWishlistRepository
    {
        Task<ICollection<WishlistDTO>> GetAllWishlistsAsync();
        Task<WishlistDTO> GetWishlistByIdAsync(int wishlistId);
        Task<ICollection<WishlistDTO>> GetWishlistByUserIdAsync(int userId);
        Task<WishlistDTO?> GetWishlistByUserIdAndProductVariantIdAsync(int userId, int variantId);
        Task<WishlistDTO> AddWishlistAsync(Wishlist wishlist);
        Task<bool> DeleteWishlistAsync(int wishlistId);
    }
}
