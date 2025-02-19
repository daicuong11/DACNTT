using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Api.Request;
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

        public OrderController(IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository, AppDbContext context)
        {
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
            _context = context;
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
        //[Authorize]
        public async Task<IActionResult> GetOrdersByUserId(int userId)
        {
            try
            {
                var orders = await _orderRepository.GetOrdersByUserIdAsync(userId);
                var response = Response<ICollection<OrderDTO>>.CreateSuccessResponse(orders, "Danh sách đơn hàng của người dùng");
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
        public async Task<IActionResult> AddOrder([FromBody] OrderRequest order)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var newOrder = new Order
                {
                    UserId = order.UserId,
                    CouponId = order.CouponId,
                    CustomerId = order.CustomerId,
                    OrderDate = DateTime.Now,
                    ShippingFee = order.ShippingFee,
                    TotalAmount = order.TotalAmount,
                    Status = OrderStatusEnum.Pending.ToString(),
                    ShippingAddress = order.ShippingAddress,
                    Note = order.Note,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                };

                if (order.CouponId != null && order.CouponId >= 0)
                {
                    newOrder.CouponId = order.CouponId;
                }
                var createdOrder = await _orderRepository.AddOrderAsync(newOrder);

                foreach(OrderDetailRequest orderDetail in order.orderDetailRequests)
                {
                    var newOrderDetail = new OrderDetail
                    {
                        OrderId = createdOrder.OrderId,
                        ProductVariantId = orderDetail.ProductVariantId,
                        Discount = orderDetail.Discount,
                        Price = orderDetail.Price,
                        Quantity = orderDetail.Quantity,
                        UnitPrice = orderDetail.UnitPrice,
                    };
                    
                    await _orderDetailRepository.AddOrderDetailAsync(newOrderDetail);
                }

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
                    Status = OrderStatusEnum.Pending.ToString(),
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
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string status)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var isUpdated = await _orderRepository.UpdateOrderStatusAsync(id, status);
                if (!isUpdated)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy đơn hàng để cập nhật trạng thái.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Trạng thái đơn hàng đã được cập nhật thành công");
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
