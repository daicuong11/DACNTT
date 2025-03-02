using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository) { 
            _commentRepository = commentRepository;
        }

        [HttpGet("product/{variantId}")]
        public async Task<IActionResult> GetComments(int variantId)
        {
            var comments = await _commentRepository.GetCommentByVariantId(variantId);
            return Ok(Response<ICollection<Comment>>.CreateSuccessResponse(comments, "Danh sách bình luận"));
        }


        [HttpPost("add-comment")]
        [Authorize]
        public async Task<IActionResult> AddComment([FromBody] CommentRequest request)
        {
            var responseError = ModelStateHelper.CheckModelState(ModelState);
            if (responseError != null)
                return BadRequest(responseError);
            try
            {
                var userId = int.Parse(User.FindFirst("userId")?.Value);

                if(userId < 1) {
                    return Unauthorized(Response<object>.CreateErrorResponse("Người dùng chưa đăng nhập"));
                }

                var newComment = new Comment
                {
                    UserId = userId,
                    ProductVariantId = request.ProductVariantId,
                    Content = request.Content,
                    CreatedAt = DateTime.Now
                };

                var createdComment = await _commentRepository.AddCommentAsync(newComment);
                return Ok(Response<Comment>.CreateSuccessResponse(createdComment, "Bình luận đã được thêm"));
            }
            catch (Exception ex)
            {
                return BadRequest(Response<object>.CreateErrorResponse($"Lỗi: {ex.Message}"));
            }
        }

        [HttpPost("add-reply")]
        [Authorize]
        public async Task<IActionResult> AddReply([FromBody] ReplyRequest request)
        {
            var responseError = ModelStateHelper.CheckModelState(ModelState);
            if (responseError != null)
                return BadRequest(responseError);
            try
            {
                var userId = int.Parse(User.FindFirst("userId")?.Value);

                if (userId < 1)
                {
                    return BadRequest(Response<object>.CreateErrorResponse("Người dùng chưa đăng nhập"));
                }

                var newReply = new Reply
                {
                    UserId = userId,
                    CommentId = request.CommentId, 
                    Content = request.Content,
                    CreatedAt = DateTime.Now
                };

                var createdReply = await _commentRepository.ReplyAsync(newReply);
                return Ok(Response<Reply>.CreateSuccessResponse(createdReply, "Phản hồi đã được thêm"));
            }
            catch (Exception ex)
            {
                return BadRequest(Response<object>.CreateErrorResponse($"Lỗi: {ex.Message}"));
            }
        }


    }
}
