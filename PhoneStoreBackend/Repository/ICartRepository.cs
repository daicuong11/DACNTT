using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface ICartRepository
    {
        Task<ICollection<CartDTO>> GetAllAsync();
        Task<CartDTO> GetCartByIdAsync(int cartId);
        Task<CartDTO> AddCartAsync(Cart cart);
        Task<bool> UpdateCartAsync(int cartId, Cart cart);
        Task<bool> DeleteCartAsync(int cartId);
    }
}
