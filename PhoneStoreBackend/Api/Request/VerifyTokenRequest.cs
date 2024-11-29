using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class VerifyTokenRequest
    {
        [Required(ErrorMessage = "Token is required.")]
        public string Token { get; set; }
    }
}
