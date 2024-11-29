﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]
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
        [Authorize]
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

        [HttpGet("user/{userId}")]
        [Authorize]
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
        [Authorize]
        public async Task<IActionResult> AddOrder([FromBody] OrderDTO orderDto)
        {
            try
            {
                var order = new Order
                {
                    UserId = orderDto.UserId,
                    OrderDate = orderDto.OrderDate,
                    TotalAmount = orderDto.TotalAmount,
                    Status = orderDto.Status
                };

                var createdOrder = await _orderRepository.AddOrderAsync(order);
                var response = Response<OrderDTO>.CreateSuccessResponse(createdOrder, "Đơn hàng đã được thêm thành công");
                return CreatedAtAction(nameof(GetOrderById), new { id = createdOrder.OrderId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] OrderDTO orderDto)
        {
            try
            {
                var order = new Order
                {
                    UserId = orderDto.UserId,
                    OrderDate = orderDto.OrderDate,
                    TotalAmount = orderDto.TotalAmount,
                    Status = orderDto.Status
                };

                var isUpdated = await _orderRepository.UpdateOrderAsync(id, order);
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
