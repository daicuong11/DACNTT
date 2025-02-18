using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class OrderService : IOrderRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public OrderService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả các đơn hàng
        public async Task<ICollection<OrderDTO>> GetAllOrdersAsync()
        {
            var orders = await _context.Orders.ToListAsync();
            return orders.Select(o => _mapper.Map<OrderDTO>(o)).ToList();
        }

        // Lấy đơn hàng theo OrderId
        public async Task<OrderDTO> GetOrderByIdAsync(int orderId)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.OrderId == orderId);
            if (order == null)
            {
                throw new KeyNotFoundException("Order not found.");
            }
            return _mapper.Map<OrderDTO>(order);
        }

        // Lấy các đơn hàng theo UserId
        public async Task<ICollection<OrderDTO>> GetOrdersByUserIdAsync(int userId)
        {
            var orders = await _context.Orders.Where(o => o.UserId == userId).ToListAsync();
            return orders.Select(o => _mapper.Map<OrderDTO>(o)).ToList();
        }

        // Thêm đơn hàng mới
        public async Task<OrderDTO> AddOrderAsync(Order order)
        {
            try
            {
                var newOrder = await _context.Orders.AddAsync(order);
                await _context.SaveChangesAsync();
                return _mapper.Map<OrderDTO>(newOrder.Entity);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi thêm order: " + ex.Message);
            }
        }

        // Cập nhật đơn hàng
        public async Task<bool> UpdateOrderAsync(int orderId, Order order)
        {
            var existingOrder = await _context.Orders.FindAsync(orderId);
            if (existingOrder == null)
            {
                throw new KeyNotFoundException("Order not found.");
            }

            existingOrder.Status = order.Status;
            existingOrder.TotalAmount = order.TotalAmount;
            existingOrder.ShippingAddress = order.ShippingAddress;
            existingOrder.UpdatedAt = DateTime.Now;

            _context.Orders.Update(existingOrder);
            await _context.SaveChangesAsync();

            return true;
        }

        // Xóa đơn hàng
        public async Task<bool> DeleteOrderAsync(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                throw new KeyNotFoundException("Order not found.");
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return true;
        }

        // Cập nhật trạng thái đơn hàng
        public async Task<bool> UpdateOrderStatusAsync(int orderId, string status)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                throw new KeyNotFoundException("Order not found.");
            }

            order.Status = status;
            order.UpdatedAt = DateTime.Now;

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
