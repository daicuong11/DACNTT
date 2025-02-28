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
            var orders = await _context.Orders
                .Include(o => o.Payment)
                .Include(o => o.Customer)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
            return _mapper.Map<ICollection<OrderDTO>>(orders);
        }

        // Lấy đơn hàng theo OrderId

        public async Task<OrderDTO> GetOrderByIdAsync(int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.Payment)
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.ProductVariant)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);
            if (order == null)
            {
                throw new KeyNotFoundException("Order not found.");
            }
            return _mapper.Map<OrderDTO>(order);
        }

        public async Task<OrderDTO> GetOrderByUserIdAndOrderIdAsync(int userId, int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.Payment)
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.ProductVariant)
                .FirstOrDefaultAsync(o => o.OrderId == orderId && o.UserId == userId);
            if (order == null)
            {
                throw new KeyNotFoundException("Order not found.");
            }
            return _mapper.Map<OrderDTO>(order);
        }

        // Lấy các đơn hàng theo UserId
        public async Task<ICollection<Order>> GetOrdersByUserIdAsync(int userId, string status = "all")
        {
            IQueryable<Order> query = _context.Orders 
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate);

            if (status != "all")
            {
                query = query.Where(o => o.Status.ToLower() == status);
            }

            return await query.ToListAsync(); 
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
