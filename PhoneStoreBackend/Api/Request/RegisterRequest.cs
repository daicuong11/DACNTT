using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Email không được để trống.")]
        [EmailAddress(ErrorMessage = "Email không đúng định dạng.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Mật khẩu không được để trống.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Mật khẩu phải có độ dài từ 6 đến 100 kí tự.")]
        public string Password { get; set; }
    }
}
