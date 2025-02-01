using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class PaymentService : IPaymentRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public PaymentService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả các khoản thanh toán
        public async Task<ICollection<PaymentDTO>> GetAllPaymentsAsync()
        {
            var payments = await _context.Payments.ToListAsync();
            return payments.Select(p => _mapper.Map<PaymentDTO>(p)).ToList();
        }

        // Lấy thanh toán theo PaymentId
        public async Task<PaymentDTO> GetPaymentByIdAsync(int paymentId)
        {
            var payment = await _context.Payments.FirstOrDefaultAsync(p => p.PaymentId == paymentId);
            if (payment == null)
            {
                throw new KeyNotFoundException("Payment not found.");
            }
            return _mapper.Map<PaymentDTO>(payment);
        }

        // Lấy thanh toán theo OrderId
        public async Task<ICollection<PaymentDTO>> GetPaymentsByOrderIdAsync(int orderId)
        {
            var payments = await _context.Payments.Where(p => p.OrderId == orderId).ToListAsync();
            return payments.Select(p => _mapper.Map<PaymentDTO>(p)).ToList();
        }

        // Thêm khoản thanh toán
        public async Task<PaymentDTO> AddPaymentAsync(Payment payment)
        {
            var newPayment = await _context.Payments.AddAsync(payment);
            await _context.SaveChangesAsync();
            return _mapper.Map<PaymentDTO>(newPayment.Entity);
        }

        // Cập nhật khoản thanh toán
        public async Task<bool> UpdatePaymentAsync(int paymentId, Payment payment)
        {
            var existingPayment = await _context.Payments.FindAsync(paymentId);
            if (existingPayment == null)
            {
                throw new KeyNotFoundException("Payment not found.");
            }

            existingPayment.PaymentMethod = payment.PaymentMethod;
            existingPayment.PaymentStatus = payment.PaymentStatus;
            existingPayment.Amount = payment.Amount;
            existingPayment.PaymentDate = payment.PaymentDate;

            _context.Payments.Update(existingPayment);
            await _context.SaveChangesAsync();

            return true;
        }

        // Xóa khoản thanh toán
        public async Task<bool> DeletePaymentAsync(int paymentId)
        {
            var payment = await _context.Payments.FindAsync(paymentId);
            if (payment == null)
            {
                throw new KeyNotFoundException("Payment not found.");
            }

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
