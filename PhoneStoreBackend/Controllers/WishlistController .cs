﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/wishlists")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly IWishlistRepository _wishlistRepository;

        public WishlistController(IWishlistRepository wishlistRepository)
        {
            _wishlistRepository = wishlistRepository;
        }

        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetAllWishlists()
        {
            try
            {
                var wishlists = await _wishlistRepository.GetAllWishlistsAsync();
                var response = Response<ICollection<WishlistDTO>>.CreateSuccessResponse(wishlists, "Danh sách tất cả các danh sách yêu thích");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{id}")]
        //[Authorize]
        public async Task<IActionResult> GetWishlistById(int id)
        {
            try
            {
                var wishlist = await _wishlistRepository.GetWishlistByIdAsync(id);
                if (wishlist == null)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy danh sách yêu thích.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<WishlistDTO>.CreateSuccessResponse(wishlist, "Thông tin danh sách yêu thích");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("user/{userId}")]
        //[Authorize]
        public async Task<IActionResult> GetWishlistByUserId(int userId)
        {
            try
            {
                var wishlists = await _wishlistRepository.GetWishlistByUserIdAsync(userId);
                var response = Response<ICollection<WishlistDTO>>.CreateSuccessResponse(wishlists, "Thông tin danh sách yêu thích của người dùng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("user/{userId}/variant/{variantId}")]
        //[Authorize]
        public async Task<IActionResult> GetWishlistByUserIdAndVariantId(int userId, int variantId)
        {
            try
            {
                if (userId < 0 || variantId < 0)
                {
                    var responseError = Response<object>.CreateErrorResponse($"Vui lòng điền đủ thông tin");

                    return BadRequest(responseError);
                }

                var createdWishlist = await _wishlistRepository.GetWishlistByUserIdAndProductVariantIdAsync(userId, variantId);
                var response = Response<WishlistDTO>.CreateSuccessResponse(createdWishlist, "Sản phẩm đã được yêu thích");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> AddWishlist([FromBody] WishlistRequest wishlist)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createWishlist = new Wishlist
                {
                    UserId = wishlist.UserId,
                    ProductVariantId = wishlist.ProductVariantId,
                };
                var createdWishlist = await _wishlistRepository.AddWishlistAsync(createWishlist);
                var response = Response<WishlistDTO>.CreateSuccessResponse(createdWishlist, "Sản phẩm đã được yêu thích");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpDelete("{id}")]
        //[Authorize]
        public async Task<IActionResult> DeleteWishlist(int id)
        {
            try
            {
                var isDeleted = await _wishlistRepository.DeleteWishlistAsync(id);
                if (!isDeleted)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy danh sách yêu thích để xóa.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Danh sách yêu thích đã được xóa thành công");
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
