using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using System.Security.Claims;

namespace PhoneStoreBackend.Repository
{
    public interface ITokenRepository
    {
        // Tạo Access Token
        string GenerateToken(User user, int expirationInMinutes = 15);

        // Xác minh Access Token
        ClaimsPrincipal VerifyToken(string token);

        // Tạo Refresh Token
        string GenerateRefreshToken(User user);

        // Xác minh Refresh Token
        ClaimsPrincipal VerifyRefreshToken(string refreshToken);
    }
}
