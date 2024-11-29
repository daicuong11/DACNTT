using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/coupons")]
    [ApiController]
    public class CouponController : ControllerBase
    {
        private readonly ICouponRepository _couponRepository;

        public CouponController(ICouponRepository couponRepository)
        {
            _couponRepository = couponRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllCoupons()
        {
            try
            {
                var coupons = await _couponRepository.GetAllAsync();
                var response = Response<ICollection<CouponDTO>>.CreateSuccessResponse(coupons, "Danh sách mã giảm giá");
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
        public async Task<IActionResult> GetCouponById(int id)
        {
            try
            {
                var coupon = await _couponRepository.GetCouponByIdAsync(id);
                if (coupon == null)
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy mã giảm giá");
                    return NotFound(errorResponse);
                }
                var response = Response<CouponDTO>.CreateSuccessResponse(coupon, "Thông tin mã giảm giá");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("code/{code}")]
        [Authorize]
        public async Task<IActionResult> GetCouponByCode(string code)
        {
            try
            {
                var coupon = await _couponRepository.GetCouponByCodeAsync(code);
                if (coupon == null)
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy mã giảm giá");
                    return NotFound(errorResponse);
                }
                var response = Response<CouponDTO>.CreateSuccessResponse(coupon, "Thông tin mã giảm giá");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> AddCoupon([FromBody] Coupon coupon)
        {
            try
            {
                var newCoupon = await _couponRepository.AddCouponAsync(coupon);
                var response = Response<CouponDTO>.CreateSuccessResponse(newCoupon, "Mã giảm giá đã được tạo");
                return CreatedAtAction(nameof(GetCouponById), new { id = newCoupon.CouponId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateCoupon(int id, [FromBody] Coupon coupon)
        {
            try
            {
                var updatedCoupon = await _couponRepository.UpdateCouponAsync(id, coupon);
                if (!updatedCoupon)
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy mã giảm giá để cập nhật");
                    return NotFound(errorResponse);
                }
                var response = Response<Coupon>.CreateSuccessResponse(coupon, "Mã giảm giá đã được cập nhật");
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
        public async Task<IActionResult> DeleteCoupon(int id)
        {
            try
            {
                var result = await _couponRepository.DeleteCouponAsync(id);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Mã giảm giá đã bị xóa");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy mã giảm giá để xóa");
                    return NotFound(errorResponse);
                }
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost("validate")]
        [Authorize]
        public async Task<IActionResult> ValidateCoupon([FromQuery] string code, [FromQuery] decimal orderAmount)
        {
            try
            {
                var isValid = await _couponRepository.ValidateCouponAsync(code, orderAmount);
                if (isValid)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Mã giảm giá hợp lệ");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Mã giảm giá không hợp lệ hoặc không đủ điều kiện");
                    return BadRequest(errorResponse);
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
