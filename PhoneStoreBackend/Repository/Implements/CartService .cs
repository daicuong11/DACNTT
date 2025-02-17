using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class CartService : ICartRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CartService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Cart> GetCartByUserIdAsync(int userId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.ProductVariant)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = userId,
                    CartItems = new List<CartItem>() 
                };

                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            return cart;
        }


        public async Task<CartItem> AddCartItemAsync(int userId, CartItem cartItem)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.Carts.Add(cart);
            }

            cartItem.CartId = cart.CartId;
            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();
            return cartItem;
        }

        public async Task<CartItem> UpdateCartItemAsync(int userId, int itemId, CartItem cartItem)
        {
            var existingItem = await _context.CartItems.FirstOrDefaultAsync(ci => ci.CartItemId == itemId && ci.Cart.UserId == userId);
            if (existingItem == null)
            {
                return null;
            }

            existingItem.Quantity = cartItem.Quantity;
            await _context.SaveChangesAsync();
            return existingItem;
        }

        public async Task<bool> RemoveCartItemAsync(int userId, int itemId)
        {
            var item = await _context.CartItems.FirstOrDefaultAsync(ci => ci.CartItemId == itemId && ci.Cart.UserId == userId);
            if (item != null)
            {
                _context.CartItems.Remove(item);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<ICollection<Cart>> GetAllAsync()
        {
            return await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.ProductVariant)
                .ToListAsync();
        }
    }
}
