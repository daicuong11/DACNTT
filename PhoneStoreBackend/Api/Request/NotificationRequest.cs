using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class NotificationRequest
    {
        [Required(ErrorMessage = "Mã người dùng là bắt buộc.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Mã người gửi là bắt buộc.")]
        public int SenderId { get; set; }

        [Required(ErrorMessage = "Tiêu đề thông báo là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Tiêu đề không được vượt quá 100 ký tự.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Nội dung thông báo là bắt buộc.")]
        public string Message { get; set; }

        [Required(ErrorMessage = "Trạng thái đã đọc là bắt buộc.")]
        public bool IsRead { get; set; }

        [Required(ErrorMessage = "Thời gian tạo là bắt buộc.")]
        public DateTime CreatedAt { get; set; }
    }
}
