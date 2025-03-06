using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Hubs;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet("product/{variantId}")]
        public async Task<IActionResult> GetComments(int variantId, [FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            var res = await _commentRepository.GetCommentByVariantId(variantId, page, pageSize);
            return Ok(res);
        }

        [HttpGet("recent-comments")]
        public async Task<IActionResult> GetRecentComments([FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            List<CommentResponse> comments = await _commentRepository.GetRecentCommentsAsync(page, pageSize);
            return Ok(Response<ICollection<CommentResponse>>.CreateSuccessResponse(comments, "Bình luận gần đây"));
        }



        [HttpPost("add-comment")]
        [Authorize]
        public async Task<IActionResult> AddComment([FromBody] CommentRequest request, [FromServices] IHubContext<CommentHub> hubContext)
        {
            var responseError = ModelStateHelper.CheckModelState(ModelState);
            if (responseError != null)
                return BadRequest(responseError);
            try
            {
                var userId = int.Parse(User.FindFirst("userId")?.Value);

                if (userId < 1)
                {
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

                // Gửi sự kiện SignalR
                await hubContext.Clients.All.SendAsync("ReceiveComment", createdComment.User.Name, createdComment.ProductVariant.VariantName);


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
