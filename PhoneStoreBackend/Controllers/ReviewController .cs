using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;
using PhoneStoreBackend.Repository.Implements;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/reviews")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly CloudinaryService _cloudinaryService;
        private readonly AppDbContext _context;

        public ReviewController(IReviewRepository reviewRepository, CloudinaryService cloudinaryService, AppDbContext context)
        {
            _reviewRepository = reviewRepository;
            _cloudinaryService = cloudinaryService;
            _context = context;
        }

        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetAllReviews()
        {
            try
            {
                var reviews = await _reviewRepository.GetAllReviewsAsync();
                var response = Response<ICollection<Review>>.CreateSuccessResponse(reviews, "Danh sách tất cả đánh giá");
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

                var response = Response<Review>.CreateSuccessResponse(review, "Thông tin đánh giá");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("product/{productId}")]
        //[Authorize]
        public async Task<IActionResult> GetReviewsByProductId(int productId, [FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            try
            {
                var response = await _reviewRepository.GetReviewsByProductIdAsync(productId, page, pageSize);
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
        public async Task<IActionResult> GetReviewsByUserId(int userId)
        {
            try
            {
                var reviews = await _reviewRepository.GetReviewsByUserIdAsync(userId);
                var response = Response<ICollection<Review>>.CreateSuccessResponse(reviews, "Danh sách đánh giá theo người dùng");
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
        public async Task<IActionResult> AddReview([FromForm] ReviewRequest review)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var userId = int.Parse(User.FindFirst("UserId")?.Value);

                List<string> imageUrls = new List<string>();

                if (review.Images != null && review.Images.Count > 0)
                {
                    foreach (var image in review.Images)
                    {
                        string imageUrl = await _cloudinaryService.UploadImageAsync(image, "Reviews");

                        if (string.IsNullOrEmpty(imageUrl))
                            throw new Exception("Lỗi tải lên ảnh.");

                        imageUrls.Add(imageUrl);
                    }
                }

                var createReview = new Review
                {
                    ProductVariantId = review.ProductVariantId,
                    UserId = userId,
                    Rating = review.Rating,
                    Comment = review.Comment,
                    Images = string.Join(";", imageUrls),
                    HasImages = imageUrls.Any(),
                    IsReply = false,
                    VerifiedPurchase = false,
                    UpdatedAt = DateTime.Now,
                    CreatedAt = DateTime.Now,
                };

                var createdReview = await _reviewRepository.AddReviewAsync(createReview);

                await transaction.CommitAsync();

                var response = Response<Review>.CreateSuccessResponse(createdReview, "Đánh giá đã được thêm thành công");
                return Ok(response);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();

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

                var userId = int.Parse(User.FindFirst("UserId")?.Value);


                var createReview = new Review
                {
                    ProductVariantId = review.ProductVariantId,
                    UserId = userId,
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
