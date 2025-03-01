using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class ReplyRequest
    {
        [Required(ErrorMessage = "Mã người bình luận là bắt buộc")]
        public int UserId { get; set; }
        [ForeignKey("UserId")]

        [Required(ErrorMessage = "Mã bình luận cha là bắt buộc")]
        public int CommentId { get; set; }

        [Required(ErrorMessage = "Nội dung bình luận là bắt buộc")]
        public string Content { get; set; }
    }
}
