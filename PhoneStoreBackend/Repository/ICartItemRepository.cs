using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface ICartItemRepository
    {
        Task<ICollection<CartItemDTO>> GetAllAsync();
        Task<CartItemDTO> GetCartItemByIdAsync(int cartItemId);
        Task<ICollection<CartItemDTO>> GetCartItemsByCartIdAsync(int cartId);
        Task<CartItemDTO> AddCartItemAsync(CartItem cartItem);
        Task<bool> UpdateCartItemAsync(int cartItemId, CartItem cartItem);
        Task<bool> DeleteCartItemAsync(int cartItemId);
    }
}
