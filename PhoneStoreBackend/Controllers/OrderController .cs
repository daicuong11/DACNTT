using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Request.GHN;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Enums;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IPaymentRepository _paymentRepository;
        private readonly IGHNRepository _gHNRepository;
        private readonly IProductVariantRepository _productVariantRepository;

        public OrderController(IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository, AppDbContext context, ICustomerRepository customerRepository, IPaymentRepository paymentRepository, IGHNRepository gHNRepository, IProductVariantRepository productVariantRepository)
        {
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
            _context = context;
            _customerRepository = customerRepository;
            _paymentRepository = paymentRepository;
            _gHNRepository = gHNRepository;
            _productVariantRepository = productVariantRepository;
        }

        [HttpGet]
        //[Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAllOrders()
        {
            try
            {
                var orders = await _orderRepository.GetAllOrdersAsync();
                var response = Response<ICollection<OrderDTO>>.CreateSuccessResponse(orders, "Danh sách tất cả các đơn hàng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{id}")]
        //[Authorize]
        public async Task<IActionResult> GetOrderById(int id)
        {
            try
            {
                var order = await _orderRepository.GetOrderByIdAsync(id);
                if (order == null)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Đơn hàng không tồn tại.");
                    return NotFound(notFoundResponse);
                }

                var orderStatusGHNReq = new GetOrderStatusGHNRequest
                {
                    ClientOrderCode = order.OrderId.ToString()
                };

                try
                {
                    var getStatusOrder = await _gHNRepository.GetGHNOrderStatusByClientOrderCode(orderStatusGHNReq);
                    if (order.Status != getStatusOrder.Status)
                    {
                        order.Status = getStatusOrder.Status;
                        await _orderRepository.UpdateOrderStatusAsync(order.OrderId, getStatusOrder.Status);
                    }
                }
                catch (Exception)
                {
                    if (order.Status != OrderStatusEnum.pending.ToString() && order.Status != OrderStatusEnum.cancel.ToString())
                    {
                        order.Status = OrderStatusEnum.pending.ToString();
                        await _orderRepository.UpdateOrderStatusAsync(order.OrderId, OrderStatusEnum.pending.ToString());
                    }
                }

                var response = Response<OrderDTO>.CreateSuccessResponse(order, "Thông tin đơn hàng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("detail/{userId}/{id}")]
        //[Authorize]
        public async Task<IActionResult> GetOrderByUserIdAndOrderId(int userId, int id)
        {
            try
            {
                var order = await _orderRepository.GetOrderByUserIdAndOrderIdAsync(userId, id);
                if (order == null)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Đơn hàng không tồn tại.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<OrderDTO>.CreateSuccessResponse(order, "Thông tin đơn hàng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }


        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetOrdersByUserId(int userId, [FromQuery] string? status = "all")
        {
            try
            {
                var orders = await _orderRepository.GetOrdersByUserIdAsync(userId, status);
                var response = Response<ICollection<Order>>.CreateSuccessResponse(orders, "Danh sách đơn hàng của người dùng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> AddOrder([FromBody] AddOrderRequest addOrderRequest)
        {
            if (addOrderRequest == null)
                return BadRequest(Response<object>.CreateErrorResponse("Dữ liệu đầu vào không hợp lệ."));

            var orderReq = addOrderRequest.Order;
            var customerReq = addOrderRequest.CustomerInfo;
            var addressReq = addOrderRequest.Address;

            if (orderReq == null || customerReq == null || addressReq == null)
                return BadRequest(Response<object>.CreateErrorResponse("Dữ liệu đơn hàng không đầy đủ."));

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Kiểm tra ModelState
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var newCus = new Customer
                {
                    Name = customerReq.Name,
                    PhoneNumber = customerReq.PhoneNumber,
                    Email = customerReq.Email,
                };

                var createdCustomer = await _customerRepository.AddAsync(newCus);

                // Lấy danh sách sản phẩm từ DB
                var productVariantIds = orderReq.orderDetailRequests.Select(od => od.ProductVariantId).ToList();
                var productVariants = await _productVariantRepository.GetProductVariantsByIds(productVariantIds);

                var missingVariants = productVariantIds.Except(productVariants.Select(pv => pv.ProductVariantId)).ToList();
                if (missingVariants.Any())
                    return BadRequest(Response<object>.CreateErrorResponse($"Sản phẩm không tồn tại: {string.Join(", ", missingVariants)}"));

                // Tạo danh sách OrderDetail
                var orderDetailsList = orderReq.orderDetailRequests.Select(od =>
                {
                    var findProduct = productVariants.First(pv => pv.ProductVariantId == od.ProductVariantId);
                    var discountPercentage = findProduct.Discount?.Percentage ?? 0;

                    return new OrderDetail
                    {
                        ProductVariantId = findProduct.ProductVariantId,
                        Discount = discountPercentage,
                        Price = findProduct.Price,
                        Quantity = od.Quantity,
                        UnitPrice = findProduct.Price * (1 - discountPercentage / 100) * od.Quantity
                    };
                }).ToList();

                if (!orderDetailsList.Any())
                    return BadRequest(Response<object>.CreateErrorResponse("Danh sách đơn hàng không được rỗng."));

                // Tính tổng tiền
                var totalAmount = orderDetailsList.Sum(od => od.UnitPrice) + orderReq.ShippingFee;
                if (totalAmount != orderReq.TotalAmount)
                {

                    return BadRequest(Response<object>.CreateErrorResponse("Giá sản phẩm đã thay đổi."));
                }

                // Tạo đơn hàng
                var newOrder = new Order
                {
                    UserId = orderReq.UserId,
                    CouponId = orderReq.CouponId ?? null,
                    CustomerId = createdCustomer.CustomerId,
                    OrderDate = DateTime.Now,
                    ShippingFee = orderReq.ShippingFee,
                    TotalAmount = totalAmount,
                    Status = OrderStatusEnum.ready_to_pick.ToString(),
                    ShippingAddress = orderReq.ShippingAddress,
                    Note = orderReq.Note,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                };
                var createdOrder = await _orderRepository.AddOrderAsync(newOrder);

                // Cập nhật OrderId cho OrderDetail và lưu vào DB
                foreach (var orderDetail in orderDetailsList)
                {
                    orderDetail.OrderId = newOrder.OrderId;
                }
                await _orderDetailRepository.AddMultipleOrderDetailsAsync(orderDetailsList);

                var response = Response<OrderDTO>.CreateSuccessResponse(createdOrder, "Đơn hàng đã được thêm thành công");
                await transaction.CommitAsync();
                return Ok(response);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost("cod")]
        public async Task<IActionResult> AddOrderCOD([FromBody] AddOrderRequest addOrderRequest)
        {
            if (addOrderRequest == null)
                return BadRequest(Response<object>.CreateErrorResponse("Dữ liệu đầu vào không hợp lệ."));

            var orderReq = addOrderRequest.Order;
            var customerReq = addOrderRequest.CustomerInfo;
            var addressReq = addOrderRequest.Address;

            if (orderReq == null || customerReq == null || addressReq == null)
                return BadRequest(Response<object>.CreateErrorResponse("Dữ liệu đơn hàng không đầy đủ."));

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Kiểm tra ModelState
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var newCus = new Customer
                {
                    Name = customerReq.Name,
                    PhoneNumber = customerReq.PhoneNumber,
                    Email = customerReq.Email,
                };

                var createdCustomer = await _customerRepository.AddAsync(newCus);

                // Lấy danh sách sản phẩm từ DB
                var productVariantIds = orderReq.orderDetailRequests.Select(od => od.ProductVariantId).ToList();
                var productVariants = await _productVariantRepository.GetProductVariantsByIds(productVariantIds);

                var missingVariants = productVariantIds.Except(productVariants.Select(pv => pv.ProductVariantId)).ToList();
                if (missingVariants.Any())
                    return BadRequest(Response<object>.CreateErrorResponse($"Sản phẩm không tồn tại: {string.Join(", ", missingVariants)}"));

                // Tạo danh sách OrderDetail
                var orderDetailsList = orderReq.orderDetailRequests.Select(od =>
                {
                    var findProduct = productVariants.First(pv => pv.ProductVariantId == od.ProductVariantId);
                    var discountPercentage = findProduct.Discount?.Percentage ?? 0;

                    return new OrderDetail
                    {
                        ProductVariantId = findProduct.ProductVariantId,
                        Discount = discountPercentage,
                        Price = findProduct.Price,
                        Quantity = od.Quantity,
                        UnitPrice = findProduct.Price * (1 - discountPercentage / 100) * od.Quantity
                    };
                }).ToList();

                if (!orderDetailsList.Any())
                    return BadRequest(Response<object>.CreateErrorResponse("Danh sách đơn hàng không được rỗng."));

                // Tính tổng tiền
                var totalAmount = orderDetailsList.Sum(od => od.UnitPrice) + orderReq.ShippingFee;
                if (totalAmount != orderReq.TotalAmount)
                {

                    return BadRequest(Response<object>.CreateErrorResponse("Giá sản phẩm đã thay đổi."));
                }

                // Tạo đơn hàng
                var newOrder = new Order
                {
                    UserId = orderReq.UserId,
                    CouponId = orderReq.CouponId ?? null,
                    CustomerId = createdCustomer.CustomerId,
                    OrderDate = DateTime.Now,
                    ShippingFee = orderReq.ShippingFee,
                    TotalAmount = totalAmount,
                    Status = OrderStatusEnum.ready_to_pick.ToString(),
                    ShippingAddress = orderReq.ShippingAddress,
                    Note = orderReq.Note,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                };
                var createdOrder = await _orderRepository.AddOrderAsync(newOrder);

                // Cập nhật OrderId cho OrderDetail và lưu vào DB
                foreach (var orderDetail in orderDetailsList)
                {
                    orderDetail.OrderId = newOrder.OrderId;
                }
                await _orderDetailRepository.AddMultipleOrderDetailsAsync(orderDetailsList);

                // Tạo thanh toán
                var payment = new Payment
                {
                    TransactionId = Guid.NewGuid().ToString(),
                    OrderId = newOrder.OrderId,
                    PaymentMethod = PaymentMethodEnum.COD.ToString(),
                    PaymentStatus = PaymentStatusEnum.Pending.ToString(),
                    Amount = newOrder.TotalAmount,
                    PaymentDate = DateTime.Now
                };
                var createdPayment = await _paymentRepository.AddPaymentAsync(payment);

                // Tạo đơn giao hàng GHN
                //var getSumQuantity = orderDetailsList.Sum(od => od.Quantity);
                //var ghnReq = new CreateOrderGHNRequest
                //{
                //    ClientOrderCode = newOrder.OrderId.ToString(),
                //    PaymentTypeId = 2,
                //    Height = (int)Math.Ceiling(getSumQuantity * 6m),
                //    Length = 30,
                //    Weight = (int)Math.Ceiling(getSumQuantity * 300m),
                //    Width = 30,
                //    RequiredNote = RequiredNoteGHNEnum.KHONGCHOXEMHANG.ToString(),
                //    ServiceTypeId = 2,
                //    ToProvinceName = addressReq.Province,
                //    ToDistrictName = addressReq.District,
                //    ToWardName = addressReq.Ward,
                //    ToAddress = addressReq.Street,
                //    ToName = newCus.Name,
                //    ToPhone = newCus.PhoneNumber,
                //    Items = orderDetailsList.Select(od => new ItemOrderGHNRequest
                //    {
                //        Name = productVariants.First(pv => pv.ProductVariantId == od.ProductVariantId).VariantName,
                //        Quantity = od.Quantity,
                //    }).ToList()
                //};

                //var createdGHNOrder = await _gHNRepository.CreateGHNOrder(ghnReq);
                //if (createdGHNOrder == null)
                //    throw new Exception("Không thể tạo đơn hàng GHN.");

                await transaction.CommitAsync();
                return Ok(Response<object>.CreateSuccessResponse(new
                {
                    Customer = createdCustomer,
                    Order = createdOrder,
                    Payment = createdPayment,
                    //GHNOrder = new {
                    //    order_code = createdGHNOrder.OrderCode,
                    //    total_fee = createdGHNOrder.TotalFee,
                    //    expected_delivery_time = createdGHNOrder.ExpectedDeliveryTime,
                    //},
                }, "Đơn hàng đã được thêm thành công"));
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return BadRequest(Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}"));
            }
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] OrderRequest order)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var newOrder = new Order
                {
                    UserId = order.UserId,
                    CouponId = order.CouponId,
                    OrderDate = DateTime.Now,
                    TotalAmount = order.TotalAmount,
                    Status = OrderStatusEnum.ready_to_pick.ToString(),
                    ShippingAddress = order.ShippingAddress,
                    Note = order.Note,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                };

                var isUpdated = await _orderRepository.UpdateOrderAsync(id, newOrder);
                if (!isUpdated)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy đơn hàng để cập nhật.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Đơn hàng đã được cập nhật thành công");
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
        public async Task<IActionResult> DeleteOrder(int id)
        {
            try
            {
                var isDeleted = await _orderRepository.DeleteOrderAsync(id);
                if (!isDeleted)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy đơn hàng để xóa.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Đơn hàng đã được xóa thành công");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }


        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateStatusOrderRequest status)
        {
            try
            {
                if (string.IsNullOrEmpty(status.Status))
                {
                    return BadRequest(Response<object>.CreateErrorResponse("Thiếu trạng thái đơn hàng."));
                }

                var isUpdated = await _orderRepository.UpdateOrderStatusAsync(id, status.Status);
                if (!isUpdated)
                {
                    return NotFound(Response<object>.CreateErrorResponse("Không tìm thấy đơn hàng để cập nhật trạng thái."));
                }

                return Ok(Response<object>.CreateSuccessResponse(null, "Trạng thái đơn hàng đã được cập nhật thành công"));
            }
            catch (Exception ex)
            {
                return BadRequest(Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}"));
            }
        }

    }
}
