using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IAuthRepository
    {
        Task<LoginResponse> LoginAsync(string phoneNumber, string password);
        Task<LoginResponse> RegisterAsync(User user);

        Task<UserDTO> VerifyTokenAsync(string token);

        Task<object> RefreshTokenAsync(string refreshToken);

        Task<string> ForgotPasswordAsync(string email);

        Task<string> ResetPasswordAsync(string email, string newPassword, string token);
    }
}
