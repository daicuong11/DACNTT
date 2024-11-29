using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class CartItemService : ICartItemRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CartItemService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả các CartItem
        public async Task<ICollection<CartItemDTO>> GetAllAsync()
        {
            var cartItems = await _context.CartItems
                                          .Include(ci => ci.Cart)
                                          .Include(ci => ci.Product)
                                          .ToListAsync();
            return cartItems.Select(ci => _mapper.Map<CartItemDTO>(ci)).ToList();
        }

        // Lấy CartItem theo CartItemId
        public async Task<CartItemDTO> GetCartItemByIdAsync(int cartItemId)
        {
            var cartItem = await _context.CartItems
                                         .Include(ci => ci.Cart)
                                         .Include(ci => ci.Product)
                                         .FirstOrDefaultAsync(ci => ci.CartItemId == cartItemId);
            if (cartItem == null)
            {
                throw new Exception("CartItem not found.");
            }

            return _mapper.Map<CartItemDTO>(cartItem);
        }

        // Lấy tất cả CartItems theo CartId
        public async Task<ICollection<CartItemDTO>> GetCartItemsByCartIdAsync(int cartId)
        {
            var cartItems = await _context.CartItems
                                          .Include(ci => ci.Cart)
                                          .Include(ci => ci.Product)
                                          .Where(ci => ci.CartId == cartId)
                                          .ToListAsync();
            return cartItems.Select(ci => _mapper.Map<CartItemDTO>(ci)).ToList();
        }

        // Thêm CartItem
        public async Task<CartItemDTO> AddCartItemAsync(CartItem cartItem)
        {
            var newCartItem = await _context.CartItems.AddAsync(cartItem);
            await _context.SaveChangesAsync();
            return _mapper.Map<CartItemDTO>(newCartItem.Entity);
        }

        // Cập nhật CartItem
        public async Task<bool> UpdateCartItemAsync(int cartItemId, CartItem cartItem)
        {
            var existingCartItem = await _context.CartItems.FindAsync(cartItemId);
            if (existingCartItem == null)
            {
                throw new Exception("CartItem not found.");
            }

            existingCartItem.Quantity = cartItem.Quantity;
            _context.CartItems.Update(existingCartItem);
            await _context.SaveChangesAsync();

            return true;
        }

        // Xóa CartItem
        public async Task<bool> DeleteCartItemAsync(int cartItemId)
        {
            var cartItem = await _context.CartItems.FindAsync(cartItemId);
            if (cartItem == null)
            {
                throw new Exception("CartItem not found.");
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
