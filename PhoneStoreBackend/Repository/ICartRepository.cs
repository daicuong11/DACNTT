using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface ICartRepository
    {
        Task<ICollection<CartResponse>> GetAllAsync();
        Task<CartResponse> GetCartByUserIdAsync(int userId);
        Task<CartItemResponse> AddCartItemAsync(int userId, CartItem cartItem);
        Task<CartItemResponse> UpdateCartItemAsync(int userId, int itemId, CartItem cartItem);
        Task<bool> RemoveCartItemAsync(int userId, int itemId);

    }
}
