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

        // Lấy tất cả giỏ hàng
        public async Task<ICollection<CartDTO>> GetAllAsync()
        {
            var carts = await _context.Carts.ToListAsync();
            return carts.Select(c => _mapper.Map<CartDTO>(c)).ToList();
        }

        // Lấy giỏ hàng theo CartId
        public async Task<CartDTO> GetCartByIdAsync(int cartId)
        {
            var cart = await _context.Carts
                                      .FirstOrDefaultAsync(c => c.CartId == cartId);
            if (cart == null)
            {
                throw new Exception("Cart not found.");
            }

            return _mapper.Map<CartDTO>(cart);
        }

        // Thêm giỏ hàng mới
        public async Task<CartDTO> AddCartAsync(Cart cart)
        {
            var newCart = await _context.Carts.AddAsync(cart);
            await _context.SaveChangesAsync();
            return _mapper.Map<CartDTO>(newCart.Entity);
        }

        // Cập nhật giỏ hàng
        public async Task<bool> UpdateCartAsync(int cartId, Cart cart)
        {
            var existingCart = await _context.Carts.FindAsync(cartId);
            if (existingCart == null)
            {
                throw new Exception("Cart not found.");
            }

            existingCart.UserId = cart.UserId;
            _context.Carts.Update(existingCart);
            await _context.SaveChangesAsync();

            return true;
        }

        // Xóa giỏ hàng
        public async Task<bool> DeleteCartAsync(int cartId)
        {
            var cart = await _context.Carts.FindAsync(cartId);
            if (cart == null)
            {
                throw new Exception("Cart not found.");
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
