using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IOrderDetailRepository
    {
        Task<ICollection<OrderDetailDTO>> GetAllOrderDetailsAsync();
        Task<OrderDetailDTO> GetOrderDetailByIdAsync(int orderDetailId);
        Task<ICollection<OrderDetailDTO>> GetOrderDetailsByOrderIdAsync(int orderId);
        Task<OrderDetailDTO> AddOrderDetailAsync(OrderDetail orderDetail);
        Task<ICollection<OrderDetail>> AddMultipleOrderDetailsAsync(ICollection<OrderDetail> orderDetail);
        
        Task<bool> UpdateOrderDetailAsync(int orderDetailId, OrderDetail orderDetail);
        Task<bool> DeleteOrderDetailAsync(int orderDetailId);
    }
}
