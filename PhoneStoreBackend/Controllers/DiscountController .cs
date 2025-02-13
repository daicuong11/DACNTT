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
    [Route("api/discounts")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly IDiscountRepository _discountRepository;

        public DiscountController(IDiscountRepository discountRepository)
        {
            _discountRepository = discountRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDiscounts()
        {
            try
            {
                var discounts = await _discountRepository.GetAllAsync();
                var response = Response<ICollection<DiscountDTO>>.CreateSuccessResponse(discounts, "Danh sách giảm giá");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDiscountById(int id)
        {
            try
            {
                var discount = await _discountRepository.GetDiscountByIdAsync(id);
                if (discount == null)
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy giảm giá");
                    return NotFound(errorResponse);
                }
                var response = Response<DiscountDTO>.CreateSuccessResponse(discount, "Thông tin giảm giá");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost]
        //[Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> AddDiscount([FromBody] DiscountRequest discount)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createDiscount = new Discount
                {
                    Percentage = discount.Percentage,
                    IsActive = discount.IsActive,
                };
                var newDiscount = await _discountRepository.AddDiscountAsync(createDiscount);
                var response = Response<DiscountDTO>.CreateSuccessResponse(newDiscount, "Giảm giá đã được tạo");
                return CreatedAtAction(nameof(GetDiscountById), new { id = newDiscount.DiscountId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateDiscount(int id, [FromBody] DiscountRequest discount)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createDiscount = new Discount
                {
                    Percentage = discount.Percentage,
                    IsActive = discount.IsActive,
                };
                var updatedDiscount = await _discountRepository.UpdateDiscountAsync(id, createDiscount);
                if (!updatedDiscount)
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy giảm giá để cập nhật");
                    return NotFound(errorResponse);
                }
                var response = Response<Discount>.CreateSuccessResponse(createDiscount, "Giảm giá đã được cập nhật");
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
        public async Task<IActionResult> DeleteDiscount(int id)
        {
            try
            {
                var result = await _discountRepository.DeleteDiscountAsync(id);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Giảm giá đã bị xóa");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy giảm giá để xóa");
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
