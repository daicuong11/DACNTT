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
    [Route("api/carts")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;

        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllCarts()
        {
            try
            {
                var carts = await _cartRepository.GetAllAsync();
                var response = Response<ICollection<CartDTO>>.CreateSuccessResponse(carts, "Danh sách giỏ hàng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{cartId}")]
        [Authorize]
        public async Task<IActionResult> GetCartById(int cartId)
        {
            try
            {
                var cart = await _cartRepository.GetCartByIdAsync(cartId);
                if (cart == null)
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy giỏ hàng");
                    return NotFound(errorResponse);
                }
                var response = Response<CartDTO>.CreateSuccessResponse(cart, "Thông tin giỏ hàng");
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
        public async Task<IActionResult> AddCart([FromBody] CartRequest cart)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createCart = new Cart
                {
                    UserId = cart.UserId,
                };

                var newCart = await _cartRepository.AddCartAsync(createCart);
                var response = Response<CartDTO>.CreateSuccessResponse(newCart, "Giỏ hàng đã được tạo");
                return CreatedAtAction(nameof(GetCartById), new { cartId = newCart.CartId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{cartId}")]
        [Authorize]
        public async Task<IActionResult> UpdateCart(int cartId, [FromBody] CartRequest cart)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createCart = new Cart
                {
                    UserId = cart.UserId,
                };

                var result = await _cartRepository.UpdateCartAsync(cartId, createCart);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Giỏ hàng đã được cập nhật");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy giỏ hàng");
                    return NotFound(errorResponse);
                }
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpDelete("{cartId}")]
        [Authorize]
        public async Task<IActionResult> DeleteCart(int cartId)
        {
            try
            {
                var result = await _cartRepository.DeleteCartAsync(cartId);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Giỏ hàng đã bị xóa");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy giỏ hàng");
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
