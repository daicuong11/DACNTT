using PhoneStoreBackend.DTOs;
using System.Security.Claims;

namespace PhoneStoreBackend.Repository
{
    public interface ITokenRepository
    {
        // Tạo Access Token
        string GenerateToken(UserDTO user, int expirationInMinutes = 15);

        // Xác minh Access Token
        ClaimsPrincipal VerifyToken(string token);

        // Tạo Refresh Token
        string GenerateRefreshToken(UserDTO user);

        // Xác minh Refresh Token
        ClaimsPrincipal VerifyRefreshToken(string refreshToken);
    }
}
