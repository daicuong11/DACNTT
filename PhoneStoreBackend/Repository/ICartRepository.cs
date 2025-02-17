using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface ICartRepository
    {
        Task<ICollection<Cart>> GetAllAsync();
        Task<Cart> GetCartByUserIdAsync(int userId);
        Task<CartItem> AddCartItemAsync(int userId, CartItem cartItem);
        Task<CartItem> UpdateCartItemAsync(int userId, int itemId, CartItem cartItem);
        Task<bool> RemoveCartItemAsync(int userId, int itemId);

    }
}
