using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IWishlistItemRepository
    {
        Task<ICollection<WishlistItemDTO>> GetAllWishlistItemsAsync();
        Task<WishlistItemDTO> GetWishlistItemByIdAsync(int wishlistItemId);
        Task<ICollection<WishlistItemDTO>> GetWishlistItemsByWishlistIdAsync(int wishlistId);
        Task<WishlistItemDTO> AddWishlistItemAsync(WishlistItem wishlistItem);
        Task<bool> DeleteWishlistItemAsync(int wishlistItemId);
    }
}
