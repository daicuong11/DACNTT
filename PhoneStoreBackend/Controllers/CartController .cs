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

        public async Task<ActionResult> GetALl()
        {
            try
            {
                var carts = await _cartRepository.GetAllAsync();
                var response = Response<ICollection<CartResponse>>.CreateSuccessResponse(carts, "Danh sách giỏ hàng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }

        }

        [HttpGet("{userId}")]
        public async Task<ActionResult> GetCart(int userId)
        {
            try
            {
                var cart = await _cartRepository.GetCartByUserIdAsync(userId);
                if (cart == null)
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy giỏ hàng");
                    return NotFound(errorResponse);
                }
                var response = Response<CartResponse>.CreateSuccessResponse(cart, "Giỏ hàng của bạn");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
            
        }

        [HttpPost("{userId}/items")]
        public async Task<ActionResult> AddCartItem(int userId, [FromBody] CartItemRequest cartItem)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);
                var createCartItem = new CartItem
                {
                    ProductVariantId = cartItem.ProductVariantId,
                    Quantity = cartItem.Quantity,
                };
                var addedItem = await _cartRepository.AddCartItemAsync(userId, createCartItem);
                var response = Response<CartItemResponse>.CreateSuccessResponse(addedItem, "Thêm vào giỏ hàng thành công");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }

        }

        [HttpPut("{userId}/items/{itemId}")]
        public async Task<ActionResult> UpdateCartItem(int userId, int itemId, [FromBody] CartItemRequest cartItem)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);
                var createCartItem = new CartItem
                {
                    ProductVariantId = cartItem.ProductVariantId,
                    Quantity = cartItem.Quantity,
                };

                var updatedItem = await _cartRepository.UpdateCartItemAsync(userId, itemId, createCartItem);
                var response = Response<CartItemResponse>.CreateSuccessResponse(updatedItem, "Chỉnh sửa vào giỏ hàng thành công");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpDelete("{userId}/items/{itemId}")]
        public async Task<ActionResult> RemoveCartItem(int userId, int itemId)
        {
            try
            {
                await _cartRepository.RemoveCartItemAsync(userId, itemId);
                return NoContent();
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

    }
}
