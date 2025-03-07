using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Enums;
using PhoneStoreBackend.Repository;
using System.Text.Json;
using VNPAY.NET;
using VNPAY.NET.Enums;
using VNPAY.NET.Models;
using VNPAY.NET.Utilities;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/Vnpay")]
    [ApiController]
    public class VnpayController : Controller
    {
        private readonly IVnpay _vnpay;
        private readonly IConfiguration _configuration;
        private readonly IOrderRepository _orderRepository;
        private readonly IPaymentRepository _paymentRepository;
        private readonly IWebHostEnvironment _env;

        public VnpayController(IVnpay vnPayservice, IConfiguration configuration, IOrderRepository orderRepository, IPaymentRepository paymentRepository, IWebHostEnvironment env)
        {
            _vnpay = vnPayservice;
            _configuration = configuration;
            _orderRepository = orderRepository;
            _paymentRepository = paymentRepository;
            _env = env;

            _vnpay.Initialize(_configuration["Vnpay:TmnCode"], _configuration["Vnpay:HashSecret"], _configuration["Vnpay:BaseUrl"], _configuration["Vnpay:CallbackUrl"]);
        }

        /// <summary>
        /// Tạo url thanh toán
        /// </summary>
        /// <param name="orderId">Đơn hàng phải thanh toán</param>
        /// <returns></returns>
        [HttpGet("CreatePaymentUrlForOrder")]
        public async Task<IActionResult> CreatePaymentUrlForOrder(int orderId)
        {
            try
            {
                var order = await _orderRepository.GetOrderByIdAsync(orderId);
                var ipAddress = NetworkHelper.GetIpAddress(HttpContext); // Lấy địa chỉ IP của thiết bị thực hiện giao dịch

                // Tạo thông tin thanh toán
                var newPayment = new Payment
                {
                    TransactionId = Guid.NewGuid().ToString(),
                    OrderId = order.OrderId,
                    PaymentMethod = PaymentMethodEnum.VNPay.ToString(),
                    PaymentStatus = PaymentStatusEnum.Pending.ToString(),
                    Amount = order.TotalAmount,
                    PaymentDate = DateTime.Now
                };

                await _paymentRepository.AddPaymentAsync(newPayment);

                var request = new PaymentRequest
                {
                    PaymentId = DateTime.Now.Ticks,
                    Money = Convert.ToDouble(order.TotalAmount),
                    Description = $"orderId_{order.OrderId}",
                    IpAddress = ipAddress,
                    BankCode = BankCode.ANY, // Tùy chọn. Mặc định là tất cả phương thức giao dịch
                    CreatedDate = DateTime.Now, // Tùy chọn. Mặc định là thời điểm hiện tại
                    Currency = Currency.VND, // Tùy chọn. Mặc định là VND (Việt Nam đồng)
                    Language = DisplayLanguage.Vietnamese // Tùy chọn. Mặc định là tiếng Việt
                };

                var paymentUrl = _vnpay.GetPaymentUrl(request);

                return Created(paymentUrl, paymentUrl);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Tạo url thanh toán
        /// </summary>
        /// <param name="money">Số tiền phải thanh toán</param>
        /// <param name="description">Mô tả giao dịch</param>
        /// <returns></returns>
        [HttpGet("CreatePaymentUrl")]
        public ActionResult<string> CreatePaymentUrl(double money, string description)
        {
            try
            {
                var ipAddress = NetworkHelper.GetIpAddress(HttpContext); // Lấy địa chỉ IP của thiết bị thực hiện giao dịch

                var request = new PaymentRequest
                {
                    PaymentId = DateTime.Now.Ticks,
                    Money = money,
                    Description = description,
                    IpAddress = ipAddress,
                    BankCode = BankCode.ANY, // Tùy chọn. Mặc định là tất cả phương thức giao dịch
                    CreatedDate = DateTime.Now, // Tùy chọn. Mặc định là thời điểm hiện tại
                    Currency = Currency.VND, // Tùy chọn. Mặc định là VND (Việt Nam đồng)
                    Language = DisplayLanguage.Vietnamese // Tùy chọn. Mặc định là tiếng Việt
                };

                var paymentUrl = _vnpay.GetPaymentUrl(request);

                return Created(paymentUrl, paymentUrl);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Thực hiện hành động sau khi thanh toán. URL này cần được khai báo với VNPAY để API này hoạt đồng (ví dụ: http://localhost:1234/api/Vnpay/IpnAction)
        /// </summary>
        /// <returns></returns>
        [HttpGet("IpnAction")]
        public async Task<IActionResult> IpnAction()
        {
            if (Request.QueryString.HasValue)
            {
                try
                {
                    Console.WriteLine("Start--------IpnAction--------");
                    Console.WriteLine(Request.QueryString.Value);
                    Console.WriteLine("End--------IpnAction--------");
                    var paymentResult = _vnpay.GetPaymentResult(Request.Query);
                    if (paymentResult.IsSuccess)
                    {
                        // Thực hiện hành động nếu thanh toán thành công tại đây. Ví dụ: Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu.
                        int orderId = int.Parse(paymentResult.Description.Replace("orderId_", ""));
                        var payment = await _paymentRepository.GetPaymentByOrderIdAsync(orderId);

                        var updatePayment = new Payment
                        {
                            TransactionId = payment.TransactionId,
                            OrderId = payment.OrderId,
                            PaymentMethod = payment.PaymentMethod,
                            PaymentStatus = PaymentStatusEnum.Success.ToString(),
                            Amount = payment.Amount,
                            PaymentDate = payment.PaymentDate,
                        };

                        await _paymentRepository.UpdatePaymentAsync(payment.PaymentId, updatePayment);

                        return Ok();
                    }

                    // Thực hiện hành động nếu thanh toán thất bại tại đây. Ví dụ: Hủy đơn hàng.
                    return BadRequest("Thanh toán thất bại");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            return NotFound("Không tìm thấy thông tin thanh toán.");
        }

        /// <summary>
        /// Trả kết quả thanh toán về cho người dùng
        /// </summary>
        /// <returns></returns>
        [HttpGet("Callback")]
        public async Task<ActionResult<PaymentResult>> Callback()
        {
            if (Request.QueryString.HasValue)
            {
                try
                {
                    var paymentResult = _vnpay.GetPaymentResult(Request.Query);
                    Console.WriteLine("Start--------Callback--------");
                    Console.WriteLine(Request.QueryString.Value);
                    Console.WriteLine("End--------Callback--------");
                    Console.WriteLine(JsonSerializer.Serialize(paymentResult, new JsonSerializerOptions { WriteIndented = true }));

                    if (paymentResult.IsSuccess)
                    {
                        if (_env.IsDevelopment())
                        {
                            Console.WriteLine("Đang chạy môi trường Development");
                            int orderId = int.Parse(paymentResult.Description.Replace("orderId_", ""));
                            var payment = await _paymentRepository.GetPaymentByOrderIdAsync(orderId);

                            var updatePayment = new Payment
                            {
                                TransactionId = payment.TransactionId,
                                OrderId = payment.OrderId,
                                PaymentMethod = payment.PaymentMethod,
                                PaymentStatus = PaymentStatusEnum.Success.ToString(),
                                Amount = payment.Amount,
                                PaymentDate = payment.PaymentDate,
                            };

                            await _paymentRepository.UpdatePaymentAsync(payment.PaymentId, updatePayment);
                        }
                        return Ok(paymentResult);
                    }

                    return BadRequest(paymentResult);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            return NotFound("Không tìm thấy thông tin thanh toán.");
        }
    }
}
