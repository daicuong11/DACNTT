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
    [Route("api/reviews")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;

        public ReviewController(IReviewRepository reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllReviews()
        {
            try
            {
                var reviews = await _reviewRepository.GetAllReviewsAsync();
                var response = Response<ICollection<ReviewDTO>>.CreateSuccessResponse(reviews, "Danh sách tất cả đánh giá");
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
        public async Task<IActionResult> GetReviewById(int id)
        {
            try
            {
                var review = await _reviewRepository.GetReviewByIdAsync(id);
                if (review == null)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy đánh giá.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<ReviewDTO>.CreateSuccessResponse(review, "Thông tin đánh giá");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("product/{productId}")]
        [Authorize]
        public async Task<IActionResult> GetReviewsByProductId(int productId)
        {
            try
            {
                var reviews = await _reviewRepository.GetReviewsByProductIdAsync(productId);
                var response = Response<ICollection<ReviewDTO>>.CreateSuccessResponse(reviews, "Danh sách đánh giá theo sản phẩm");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetReviewsByUserId(int userId)
        {
            try
            {
                var reviews = await _reviewRepository.GetReviewsByUserIdAsync(userId);
                var response = Response<ICollection<ReviewDTO>>.CreateSuccessResponse(reviews, "Danh sách đánh giá theo người dùng");
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
        public async Task<IActionResult> AddReview([FromBody] ReviewRequest review)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createReview = new Review
                {
                    ProductVariantId = review.ProductVariantId,
                    UserId = review.UserId,
                    Rating = review.Rating,
                    Comment = review.Comment,
                    CreatedAt = DateTime.Now,
                };
                var createdReview = await _reviewRepository.AddReviewAsync(createReview);
                var response = Response<ReviewDTO>.CreateSuccessResponse(createdReview, "Đánh giá đã được thêm thành công");
                return CreatedAtAction(nameof(GetReviewById), new { id = createdReview.ReviewId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateReview(int id, [FromBody] ReviewRequest review)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createReview = new Review
                {
                    ProductVariantId = review.ProductVariantId,
                    UserId = review.UserId,
                    Rating = review.Rating,
                    Comment = review.Comment,
                    CreatedAt = DateTime.Now,
                };
                var isUpdated = await _reviewRepository.UpdateReviewAsync(id, createReview);
                if (!isUpdated)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy đánh giá để cập nhật.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Đánh giá đã được cập nhật thành công");
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
        public async Task<IActionResult> DeleteReview(int id)
        {
            try
            {
                var isDeleted = await _reviewRepository.DeleteReviewAsync(id);
                if (!isDeleted)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy đánh giá để xóa.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Đánh giá đã được xóa thành công");
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
