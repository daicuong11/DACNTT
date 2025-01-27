using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/payments")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentRepository _paymentRepository;

        public PaymentController(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAllPayments()
        {
            try
            {
                var payments = await _paymentRepository.GetAllPaymentsAsync();
                var response = Response<ICollection<PaymentDTO>>.CreateSuccessResponse(payments, "Danh sách tất cả các khoản thanh toán");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetPaymentById(int id)
        {
            try
            {
                var payment = await _paymentRepository.GetPaymentByIdAsync(id);
                if (payment == null)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy thông tin thanh toán.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<PaymentDTO>.CreateSuccessResponse(payment, "Thông tin thanh toán");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("order/{orderId}")]
        [Authorize]
        public async Task<IActionResult> GetPaymentsByOrderId(int orderId)
        {
            try
            {
                var payments = await _paymentRepository.GetPaymentsByOrderIdAsync(orderId);
                var response = Response<ICollection<PaymentDTO>>.CreateSuccessResponse(payments, "Danh sách thanh toán theo đơn hàng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPayment([FromBody] PaymentRequest payment)
        {
            try
            {
                var createPayment = new Payment
                {
                    OrderId = payment.OrderId,
                    PaymentStatus = payment.PaymentStatus,
                    Amount = payment.Amount,
                    PaymentDate = DateTime.Now,
                    PaymentMethod = payment.PaymentMethod
                };

                var createdPayment = await _paymentRepository.AddPaymentAsync(createPayment);
                var response = Response<PaymentDTO>.CreateSuccessResponse(createdPayment, "Thanh toán đã được thêm thành công");
                return CreatedAtAction(nameof(GetPaymentById), new { id = createdPayment.PaymentId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdatePayment(int id, [FromBody] PaymentRequest payment)
        {
            try
            {
                var createPayment = new Payment
                {
                    OrderId = payment.OrderId,
                    PaymentStatus = payment.PaymentStatus,
                    Amount = payment.Amount,
                    PaymentDate = DateTime.Now,
                    PaymentMethod = payment.PaymentMethod
                };

                var isUpdated = await _paymentRepository.UpdatePaymentAsync(id, createPayment);
                if (!isUpdated)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy thông tin thanh toán để cập nhật.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Thông tin thanh toán đã được cập nhật thành công");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            try
            {
                var isDeleted = await _paymentRepository.DeletePaymentAsync(id);
                if (!isDeleted)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy thông tin thanh toán để xóa.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Thông tin thanh toán đã được xóa thành công");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }
    }
}
