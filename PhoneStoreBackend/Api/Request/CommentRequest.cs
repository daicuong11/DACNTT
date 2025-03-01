using PhoneStoreBackend.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class CommentRequest
    {

        [Required(ErrorMessage = "Mã người bình luận là bắt buộc")]
        public int UserId { get; set; }
        [ForeignKey("UserId")]

        [Required(ErrorMessage = "Mã sản phẩm là bắt buộc")]
        public int ProductVariantId { get; set; }

        [Required(ErrorMessage = "Nội dung bình luận là bắt buộc")]
        public string Content { get; set; }
    }
}
