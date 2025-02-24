using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/order-details")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailRepository _orderDetailRepository;

        public OrderDetailController(IOrderDetailRepository orderDetailRepository)
        {
            _orderDetailRepository = orderDetailRepository;
        }

        [HttpGet]
        //[Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAllOrderDetails()
        {
            try
            {
                var orderDetails = await _orderDetailRepository.GetAllOrderDetailsAsync();
                var response = Response<ICollection<OrderDetailDTO>>.CreateSuccessResponse(orderDetails, "Danh sách chi tiết đơn hàng");
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
        public async Task<IActionResult> GetOrderDetailById(int id)
        {
            try
            {
                var orderDetail = await _orderDetailRepository.GetOrderDetailByIdAsync(id);
                if (orderDetail == null)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Chi tiết đơn hàng không tồn tại.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<OrderDetail>.CreateSuccessResponse(orderDetail, "Chi tiết đơn hàng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("order/{orderId}")]
        //[Authorize]
        public async Task<IActionResult> GetOrderDetailsByOrderId(int orderId)
        {
            try
            {
                var orderDetails = await _orderDetailRepository.GetOrderDetailsByOrderIdAsync(orderId);
                var response = Response<ICollection<OrderDetail>>.CreateSuccessResponse(orderDetails, "Chi tiết đơn hàng theo ID đơn hàng");
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
        public async Task<IActionResult> AddOrderDetail([FromBody] OrderDetailRequest orderDetailReq)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var orderDetail = new OrderDetail
                {
                    OrderId = orderDetailReq.OrderId,
                    ProductVariantId = orderDetailReq.ProductVariantId,
                    Price = orderDetailReq.Price,
                    Discount = orderDetailReq.Discount,
                    Quantity = orderDetailReq.Quantity,
                    UnitPrice = orderDetailReq.UnitPrice
                };

                var createdOrderDetail = await _orderDetailRepository.AddOrderDetailAsync(orderDetail);
                var response = Response<OrderDetailDTO>.CreateSuccessResponse(createdOrderDetail, "Chi tiết đơn hàng đã được thêm thành công");
                return CreatedAtAction(nameof(GetOrderDetailById), new { id = createdOrderDetail.OrderDetailId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateOrderDetail(int id, [FromBody] OrderDetailRequest orderDetailReq)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var orderDetail = new OrderDetail
                {
                    OrderId = orderDetailReq.OrderId,
                    ProductVariantId = orderDetailReq.ProductVariantId,
                    Price = orderDetailReq.Price,
                    Discount = orderDetailReq.Discount,
                    Quantity = orderDetailReq.Quantity,
                    UnitPrice = orderDetailReq.UnitPrice
                };

                var isUpdated = await _orderDetailRepository.UpdateOrderDetailAsync(id, orderDetail);
                if (!isUpdated)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy chi tiết đơn hàng để cập nhật.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Chi tiết đơn hàng đã được cập nhật thành công");
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
        public async Task<IActionResult> DeleteOrderDetail(int id)
        {
            try
            {
                var isDeleted = await _orderDetailRepository.DeleteOrderDetailAsync(id);
                if (!isDeleted)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy chi tiết đơn hàng để xóa.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Chi tiết đơn hàng đã được xóa thành công");
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
