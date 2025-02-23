using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IPaymentRepository
    {
        Task<ICollection<PaymentDTO>> GetAllPaymentsAsync();
        Task<PaymentDTO> GetPaymentByIdAsync(int paymentId);
        Task<PaymentDTO> GetPaymentByOrderIdAsync(int orderId);
        Task<ICollection<PaymentDTO>> GetPaymentsByOrderIdAsync(int orderId);
        Task<PaymentDTO> AddPaymentAsync(Payment payment);
        Task<bool> UpdatePaymentAsync(int paymentId, Payment payment);
        Task<bool> DeletePaymentAsync(int paymentId);
    }
}
