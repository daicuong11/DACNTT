using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IOrderRepository
    {
        Task<ICollection<OrderDTO>> GetAllOrdersAsync();
        Task<OrderDTO> GetOrderByIdAsync(int orderId);
        Task<OrderDTO> GetOrderByUserIdAndOrderIdAsync(int userID, int orderId);
        Task<ICollection<Order>> GetOrdersByUserIdAsync(int userId, string status = "all");
        Task<OrderDTO> AddOrderAsync(Order order);
        Task<bool> UpdateOrderAsync(int orderId, Order order);
        Task<bool> DeleteOrderAsync(int orderId);
        Task<bool> UpdateOrderStatusAsync(int orderId, string status);
    }
}
