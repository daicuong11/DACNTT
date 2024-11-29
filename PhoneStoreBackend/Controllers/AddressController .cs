using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/addresses")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressRepository _addressRepository;

        public AddressController(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        [HttpGet("user/{userId}")]
        [Authorize]  
        public async Task<IActionResult> GetAddressesByUserId(int userId)
        {
            try
            {
                var addresses = await _addressRepository.GetAllByUserIdAsync(userId);
                var response = Response<ICollection<AddressDTO>>.CreateSuccessResponse(addresses, "Danh sách địa chỉ người dùng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{addressId}")]
        [Authorize]  
        public async Task<IActionResult> GetAddressById(int addressId)
        {
            try
            {
                var address = await _addressRepository.GetAddressByIdAsync(addressId);
                var response = Response<AddressDTO>.CreateSuccessResponse(address, "Thông tin địa chỉ");
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
        public async Task<IActionResult> AddAddress([FromBody] Address address)
        {
            try
            {
                var newAddress = await _addressRepository.AddAddressAsync(address);
                var response = Response<AddressDTO>.CreateSuccessResponse(newAddress, "Địa chỉ đã được tạo thành công");
                return CreatedAtAction(nameof(GetAddressById), new { addressId = newAddress.AddressId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{addressId}")]
        [Authorize] 
        public async Task<IActionResult> UpdateAddress(int addressId, [FromBody] Address address)
        {
            try
            {
                var result = await _addressRepository.UpdateAddressAsync(addressId, address);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Địa chỉ đã được cập nhật");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy địa chỉ");
                    return NotFound(errorResponse);
                }
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpDelete("{addressId}")]
        [Authorize]  
        public async Task<IActionResult> DeleteAddress(int addressId)
        {
            try
            {
                var result = await _addressRepository.DeleteAddressAsync(addressId);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Địa chỉ đã bị xóa");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy địa chỉ");
                    return NotFound(errorResponse);
                }
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }
    }
}
