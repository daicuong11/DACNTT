using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Enums;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;
using System.Security.Cryptography;
using System.Text;

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

        [HttpPost("pay/cod")]
        public async Task<IActionResult> PayCOD([FromBody] OrderPaymentRequest paymentReq)
        {
            if (paymentReq == null || paymentReq.Amount <= 0)
            {
                return BadRequest("Thông tin đơn hàng không hợp lệ. Tổng tiền sai");
            }

            var responseError = ModelStateHelper.CheckModelState(ModelState);
            if (responseError != null)
                return BadRequest(responseError);
            try
            {
                // Tạo thông tin thanh toán
                var payment = new Payment
                {
                    TransactionId = Guid.NewGuid().ToString(),
                    OrderId = paymentReq.OrderId,
                    PaymentMethod = PaymentMethodEnum.COD.ToString(),
                    PaymentStatus = PaymentStatusEnum.Pending.ToString(),
                    Amount = paymentReq.Amount,
                    PaymentDate = DateTime.Now
                };

                var newPayment = await _paymentRepository.AddPaymentAsync(payment);

                var response = Response<PaymentDTO>.CreateSuccessResponse(newPayment, "Thanh toán khi nhận hàng được ghi nhận");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost("pay/vnpay")]
        public async Task<IActionResult> PayVNPay([FromBody] Order order)
        {
            if (order == null || order.TotalAmount <= 0)
            {
                return BadRequest("Thông tin đơn hàng không hợp lệ.");
            }

            // Tạo yêu cầu thanh toán và chuyển hướng người dùng đến VNPay
            var vnpayUrl = GetVnPayUrl(order);

            // Tạo thông tin thanh toán
            var payment = new Payment
            {
                TransactionId = Guid.NewGuid().ToString(),
                OrderId = order.OrderId,
                PaymentMethod = "VnPay",
                PaymentStatus = "Pending",
                Amount = order.TotalAmount,
                PaymentDate = DateTime.Now
            };

            await _paymentRepository.AddPaymentAsync(payment);


            return Redirect(vnpayUrl);
        }

        private string GetVnPayUrl(Order order)
        {
            // Tạo URL thanh toán VNPay (như đã giải thích trong phần trước)
            var vnpayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            var vnpayParams = new Dictionary<string, string>
                {
                    { "vnp_TxnRef", order.OrderId.ToString() },
                    { "vnp_Amount", (order.TotalAmount * 100).ToString() },
                    { "vnp_Locale", "vn" },
                    { "vnp_OrderInfo", "Thanh toán đơn hàng #" + order.OrderId },
                    { "vnp_ReturnUrl", "https://yourdomain.com/api/payment/callback" },
                    { "vnp_TmnCode", "YourTmnCode" },
                };

            var secureHash = GenerateSecureHash(vnpayParams);
            vnpayParams.Add("vnp_SecureHash", secureHash);

            var queryString = string.Join("&", vnpayParams.Select(kv => $"{kv.Key}={kv.Value}"));
            vnpayUrl = vnpayUrl + "?" + queryString;

            return vnpayUrl;
        }

        private string GenerateSecureHash(Dictionary<string, string> parameters)
        {
            var secretKey = "YourSecretKey";
            var data = string.Join("&", parameters.Where(kv => kv.Key != "vnp_SecureHash").Select(kv => $"{kv.Key}={kv.Value}"));
            return CalculateHash(data + secretKey);
        }

        private string CalculateHash(string data)
        {
            using SHA256 sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(data);
            var hash = sha256.ComputeHash(bytes);
            return string.Concat(hash.Select(b => b.ToString("X2")));
        }

        [HttpGet("callback/vnpay")]
        public IActionResult VnPayCallback([FromQuery] string vnp_ResponseCode, [FromQuery] string vnp_TxnRef)
        {
            if (vnp_ResponseCode == "00")
            {
                // Cập nhật trạng thái thanh toán
                //var payment = _context.Payments.FirstOrDefault(p => p.TransactionId == vnp_TxnRef);
                //if (payment != null)
                //{
                //    payment.PaymentStatus = "Completed";
                //    _context.SaveChanges();
                //}
                return Ok("Thanh toán VNPay thành công!");
            }

            return Ok("Thanh toán VNPay thất bại!");
        }



        [HttpPost("pay/momo")]
        public async Task<IActionResult> PayMoMo([FromBody] Order order)
        {
            if (order == null || order.TotalAmount <= 0)
            {
                return BadRequest("Thông tin đơn hàng không hợp lệ.");
            }

            // Tạo URL thanh toán MoMo và chuyển hướng người dùng
            var momoUrl = GetMoMoUrl(order);

            // Tạo thông tin thanh toán
            var payment = new Payment
            {
                TransactionId = Guid.NewGuid().ToString(),
                OrderId = order.OrderId,
                PaymentMethod = PaymentMethodEnum.MOMO.ToString(),
                PaymentStatus = PaymentStatusEnum.Pending.ToString(),
                Amount = order.TotalAmount,
                PaymentDate = DateTime.Now
            };

            // Lưu thông tin thanh toán vào cơ sở dữ liệu
            await _paymentRepository.AddPaymentAsync(payment);


            return Redirect(momoUrl); // Chuyển hướng đến MoMo
        }

        private string GetMoMoUrl(Order order)
        {
            // Tạo URL thanh toán MoMo (bạn cần thay đổi phần này theo tài liệu MoMo)
            return "https://momo.vn/payment?order=" + order.OrderId.ToString();
        }

        [HttpGet("callback/momo")]
        public IActionResult MoMoCallback([FromQuery] string status, [FromQuery] string orderId)
        {
            if (status == "success")
            {
                // Cập nhật trạng thái thanh toán
                //var payment = _context.Payments.FirstOrDefault(p => p.TransactionId == orderId);
                //if (payment != null)
                //{
                //    payment.PaymentStatus = "Completed";
                //    _context.SaveChanges();
                //}
                return Ok("Thanh toán MoMo thành công!");
            }

            return Ok("Thanh toán MoMo thất bại!");
        }


        [HttpPost]
        public async Task<IActionResult> AddPayment([FromBody] OrderPaymentRequest payment)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createPayment = new Payment
                {
                    OrderId = payment.OrderId,
                    PaymentStatus = PaymentStatusEnum.Pending.ToString(),
                    Amount = payment.Amount,
                    PaymentDate = DateTime.Now,
                    PaymentMethod = PaymentMethodEnum.COD.ToString()
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

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdatePayment(int id, [FromBody] PaymentRequest payment)
        //{
        //    try
        //    {
        //        var responseError = ModelStateHelper.CheckModelState(ModelState);
        //        if (responseError != null)
        //            return BadRequest(responseError);

        //        var createPayment = new Payment
        //        {
        //            OrderId = payment.OrderId,
        //            PaymentStatus = payment.PaymentStatus,
        //            Amount = payment.Amount,
        //            PaymentDate = DateTime.Now,
        //            PaymentMethod = payment.PaymentMethod
        //        };

        //        var isUpdated = await _paymentRepository.UpdatePaymentAsync(id, createPayment);
        //        if (!isUpdated)
        //        {
        //            var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy thông tin thanh toán để cập nhật.");
        //            return NotFound(notFoundResponse);
        //        }

        //        var response = Response<object>.CreateSuccessResponse(null, "Thông tin thanh toán đã được cập nhật thành công");
        //        return Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
        //        return BadRequest(errorResponse);
        //    }
        //}

        [HttpDelete("{id}")]
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
