using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class ResetPasswordRequest
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "New password is required.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Token is required.")]
        public string Token { get; set; }
    }
}
