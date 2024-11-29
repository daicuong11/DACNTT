using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class FogetPasswordRequest
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }
    }
}
