using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/wishlist-items")]
    [ApiController]
    public class WishlistItemController : ControllerBase
    {
        private readonly IWishlistItemRepository _wishlistItemRepository;

        public WishlistItemController(IWishlistItemRepository wishlistItemRepository)
        {
            _wishlistItemRepository = wishlistItemRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllWishlistItems()
        {
            try
            {
                var wishlistItems = await _wishlistItemRepository.GetAllWishlistItemsAsync();
                var response = Response<ICollection<WishlistItemDTO>>.CreateSuccessResponse(wishlistItems, "Danh sách tất cả các mục trong danh sách yêu thích");
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
        public async Task<IActionResult> GetWishlistItemById(int id)
        {
            try
            {
                var wishlistItem = await _wishlistItemRepository.GetWishlistItemByIdAsync(id);
                if (wishlistItem == null)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy mục trong danh sách yêu thích.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<WishlistItemDTO>.CreateSuccessResponse(wishlistItem, "Thông tin mục trong danh sách yêu thích");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("wishlist/{wishlistId}")]
        [Authorize]
        public async Task<IActionResult> GetWishlistItemsByWishlistId(int wishlistId)
        {
            try
            {
                var wishlistItems = await _wishlistItemRepository.GetWishlistItemsByWishlistIdAsync(wishlistId);
                var response = Response<ICollection<WishlistItemDTO>>.CreateSuccessResponse(wishlistItems, "Danh sách các mục trong danh sách yêu thích");
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
        public async Task<IActionResult> AddWishlistItem([FromBody] WishlistItem wishlistItem)
        {
            try
            {
                var createdWishlistItem = await _wishlistItemRepository.AddWishlistItemAsync(wishlistItem);
                var response = Response<WishlistItemDTO>.CreateSuccessResponse(createdWishlistItem, "Mục đã được thêm vào danh sách yêu thích thành công");
                return CreatedAtAction(nameof(GetWishlistItemById), new { id = createdWishlistItem.WishlistItemId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteWishlistItem(int id)
        {
            try
            {
                var isDeleted = await _wishlistItemRepository.DeleteWishlistItemAsync(id);
                if (!isDeleted)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy mục trong danh sách yêu thích để xóa.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Mục trong danh sách yêu thích đã được xóa thành công");
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
