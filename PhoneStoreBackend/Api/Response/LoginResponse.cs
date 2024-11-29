using PhoneStoreBackend.DTOs;

namespace PhoneStoreBackend.Api.Response
{
    public class LoginResponse
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }

        public int ExpiresIn { get; set; }

        public object User { get; set; } 
    }

}
