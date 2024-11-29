using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/shipping-addresses")]
    [ApiController]
    public class ShippingAddressController : ControllerBase
    {
        private readonly IShippingAddressRepository _shippingAddressRepository;

        public ShippingAddressController(IShippingAddressRepository shippingAddressRepository)
        {
            _shippingAddressRepository = shippingAddressRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllShippingAddresses()
        {
            try
            {
                var shippingAddresses = await _shippingAddressRepository.GetAllShippingAddressesAsync();
                var response = Response<ICollection<ShippingAddressDTO>>.CreateSuccessResponse(shippingAddresses, "Danh sách tất cả địa chỉ giao hàng");
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
        public async Task<IActionResult> GetShippingAddressById(int id)
        {
            try
            {
                var shippingAddress = await _shippingAddressRepository.GetShippingAddressByIdAsync(id);
                if (shippingAddress == null)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy địa chỉ giao hàng.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<ShippingAddressDTO>.CreateSuccessResponse(shippingAddress, "Thông tin địa chỉ giao hàng");
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
        public async Task<IActionResult> GetShippingAddressesByOrderId(int orderId)
        {
            try
            {
                var shippingAddresses = await _shippingAddressRepository.GetShippingAddressesByOrderIdAsync(orderId);
                var response = Response<ICollection<ShippingAddressDTO>>.CreateSuccessResponse(shippingAddresses, "Danh sách địa chỉ giao hàng theo đơn hàng");
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
        public async Task<IActionResult> AddShippingAddress([FromBody] ShippingAddress shippingAddress)
        {
            try
            {
                var createdShippingAddress = await _shippingAddressRepository.AddShippingAddressAsync(shippingAddress);
                var response = Response<ShippingAddressDTO>.CreateSuccessResponse(createdShippingAddress, "Địa chỉ giao hàng đã được thêm thành công");
                return CreatedAtAction(nameof(GetShippingAddressById), new { id = createdShippingAddress.OrderId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateShippingAddress(int id, [FromBody] ShippingAddress shippingAddress)
        {
            try
            {
                var isUpdated = await _shippingAddressRepository.UpdateShippingAddressAsync(id, shippingAddress);
                if (!isUpdated)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy địa chỉ giao hàng để cập nhật.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Địa chỉ giao hàng đã được cập nhật thành công");
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
        public async Task<IActionResult> DeleteShippingAddress(int id)
        {
            try
            {
                var isDeleted = await _shippingAddressRepository.DeleteShippingAddressAsync(id);
                if (!isDeleted)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy địa chỉ giao hàng để xóa.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Địa chỉ giao hàng đã được xóa thành công");
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
