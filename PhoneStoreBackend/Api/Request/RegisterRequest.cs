using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Tên không được để trống.")]
        public string name { get; set; }

        [Required(ErrorMessage = "Số điện thoại không được để trống.")]
        public string phoneNumber { get; set; }

        [Required(ErrorMessage = "Email không được để trống.")]
        [EmailAddress(ErrorMessage = "Email không đúng định dạng.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Mật khẩu không được để trống.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Mật khẩu phải có độ dài từ 6 đến 100 kí tự.")]
        public string Password { get; set; }
    }
}
