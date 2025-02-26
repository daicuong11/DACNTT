using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class ChangePasswordRequest
    {
        [Required(ErrorMessage = "Mã người dùng là bắt buộc.")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Mật khẩu là bắt buộc.")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "Mật khẩu mới là bắt buộc.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Mật khẩu mới ngắn hơn 6 ký tự hoặc dài hơn 100 ký tự")]
        public string NewPassword { get; set; }

    }
}
