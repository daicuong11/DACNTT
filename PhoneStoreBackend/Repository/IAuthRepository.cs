using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;

namespace PhoneStoreBackend.Repository
{
    public interface IAuthRepository
    {
        Task<LoginResponse> LoginAsync(string email, string password);
        Task<LoginResponse> RegisterAsync(RegisterRequest userInfo);

        Task<UserDTO> VerifyTokenAsync(string token);

        Task<object> RefreshTokenAsync(string refreshToken);

        Task<string> ForgotPasswordAsync(string email);

        Task<string> ResetPasswordAsync(string email, string newPassword, string token);
    }
}
