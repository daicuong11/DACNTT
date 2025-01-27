using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class ReviewRequest
    {
        [Required(ErrorMessage = "Mã biến thể sản phẩm là bắt buộc.")]
        public int ProductVariantId { get; set; }

        [Required(ErrorMessage = "Mã người dùng là bắt buộc.")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Đánh giá là bắt buộc.")]
        [Range(1, 5, ErrorMessage = "Đánh giá phải từ 1 đến 5.")]
        public int Rating { get; set; }

        [StringLength(1000, ErrorMessage = "Bình luận không được vượt quá 1000 ký tự.")]
        public string Comment { get; set; }

        [Required(ErrorMessage = "Ngày tạo là bắt buộc.")]
        public DateTime CreatedAt { get; set; }
    }
}
