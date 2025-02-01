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
    [Route("api/cart-items")]
    [ApiController]
    public class CartItemController : ControllerBase
    {
        private readonly ICartItemRepository _cartItemRepository;

        public CartItemController(ICartItemRepository cartItemRepository)
        {
            _cartItemRepository = cartItemRepository;
        }

        [HttpGet]
        [Authorize]  
        public async Task<IActionResult> GetAllCartItems()
        {
            try
            {
                var cartItems = await _cartItemRepository.GetAllAsync();
                var response = Response<ICollection<CartItemDTO>>.CreateSuccessResponse(cartItems, "Danh sách mặt hàng trong giỏ hàng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{cartItemId}")]
        [Authorize]  
        public async Task<IActionResult> GetCartItemById(int cartItemId)
        {
            try
            {
                var cartItem = await _cartItemRepository.GetCartItemByIdAsync(cartItemId);
                if (cartItem == null)
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy mặt hàng trong giỏ hàng");
                    return NotFound(errorResponse);
                }
                var response = Response<CartItemDTO>.CreateSuccessResponse(cartItem, "Thông tin mặt hàng trong giỏ");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("cart/{cartId}")]
        [Authorize]
        public async Task<IActionResult> GetCartItemsByCartId(int cartId)
        {
            try
            {
                var cartItems = await _cartItemRepository.GetCartItemsByCartIdAsync(cartId);
                var response = Response<ICollection<CartItemDTO>>.CreateSuccessResponse(cartItems, "Danh sách mặt hàng trong giỏ hàng");
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
        public async Task<IActionResult> AddCartItem([FromBody] CartItemRequest cartItem)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createCartItem = new CartItem
                {
                    CartId = cartItem.CartId,
                    ProductVariantId = cartItem.ProductVariantId,
                    Quantity = cartItem.Quantity,
                };
                var newCartItem = await _cartItemRepository.AddCartItemAsync(createCartItem);
                var response = Response<CartItemDTO>.CreateSuccessResponse(newCartItem, "Mặt hàng đã được thêm vào giỏ hàng");
                return CreatedAtAction(nameof(GetCartItemById), new { cartItemId = newCartItem.CartItemId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{cartItemId}")]
        [Authorize]  
        public async Task<IActionResult> UpdateCartItem(int cartItemId, [FromBody] CartItemRequest cartItem)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createCartItem = new CartItem
                {
                    CartId = cartItem.CartId,
                    ProductVariantId = cartItem.ProductVariantId,
                    Quantity = cartItem.Quantity,
                };
                var result = await _cartItemRepository.UpdateCartItemAsync(cartItemId, createCartItem);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Mặt hàng đã được cập nhật");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy mặt hàng trong giỏ hàng");
                    return NotFound(errorResponse);
                }
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpDelete("{cartItemId}")]
        [Authorize] 
        public async Task<IActionResult> DeleteCartItem(int cartItemId)
        {
            try
            {
                var result = await _cartItemRepository.DeleteCartItemAsync(cartItemId);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Mặt hàng đã bị xóa khỏi giỏ");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy mặt hàng trong giỏ hàng");
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
