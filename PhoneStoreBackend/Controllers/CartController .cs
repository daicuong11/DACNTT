using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
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
                var response = Response<ICollection<Cart>>.CreateSuccessResponse(carts, "Danh sách giỏ hàng");
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
                var response = Response<Cart>.CreateSuccessResponse(cart, "Giỏ hàng của bạn");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
            
        }

        [HttpPost("{userId}/items")]
        public async Task<ActionResult> AddCartItem(int userId, [FromBody] CartItem cartItem)
        {
            try
            {
                var addedItem = await _cartRepository.AddCartItemAsync(userId, cartItem);
                var response = Response<CartItem>.CreateSuccessResponse(addedItem, "Thêm vào giỏ hàng thành công");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }

        }

        [HttpPut("{userId}/items/{itemId}")]
        public async Task<ActionResult> UpdateCartItem(int userId, int itemId, [FromBody] CartItem cartItem)
        {
            try
            {
                var updatedItem = await _cartRepository.UpdateCartItemAsync(userId, itemId, cartItem);
                var response = Response<CartItem>.CreateSuccessResponse(updatedItem, "Chỉnh sửa vào giỏ hàng thành công");

                return Ok(updatedItem);
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
