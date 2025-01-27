using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class UserRequest
    {
        [Required(ErrorMessage = "Mã người dùng là bắt buộc.")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Tên người dùng là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Tên người dùng không được vượt quá 100 ký tự.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email là bắt buộc.")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ.")]
        [StringLength(200, ErrorMessage = "Email không được vượt quá 200 ký tự.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Mật khẩu là bắt buộc.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Số điện thoại là bắt buộc.")]
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ.")]
        [StringLength(15, ErrorMessage = "Số điện thoại không được vượt quá 15 ký tự.")]
        public string PhoneNumber { get; set; }

        [StringLength(500, ErrorMessage = "Địa chỉ không được vượt quá 500 ký tự.")]
        public string Address { get; set; }

        [Required(ErrorMessage = "Vai trò là bắt buộc.")]
        [StringLength(50, ErrorMessage = "Vai trò không được vượt quá 50 ký tự.")]
        public string Role { get; set; }

        [Required(ErrorMessage = "Thời gian tạo là bắt buộc.")]
        public DateTime CreatedAt { get; set; }

        [Required(ErrorMessage = "Thời gian cập nhật là bắt buộc.")]
        public DateTime UpdatedAt { get; set; }
    }
}
