using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Enums;
using System.IdentityModel.Tokens.Jwt;

namespace PhoneStoreBackend.Repository.Implements
{
    public class AuthService : IAuthRepository
    {
        private readonly AppDbContext _context;
        private readonly ITokenRepository _tokenService;
        private readonly IEmailRepository _emailService;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userService;

        public AuthService(AppDbContext context, ITokenRepository tokenService, IEmailRepository emailService, IUserRepository userService, IMapper mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _emailService = emailService;
            _userService = userService;
            _mapper = mapper;
        }

        public async Task<LoginResponse> LoginAsync(string phoneNumber, string password)
        {
            var user = await _context.Users
            .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);

            if (user == null || !user.Active || !BCrypt.Net.BCrypt.Verify(password, user.Password))
                throw new Exception("Thông tin đăng nhập không chính xác.");

            var tokenExpirationInMinutes = 15;

            var accessToken = _tokenService.GenerateToken(user, tokenExpirationInMinutes);
            var refreshToken = _tokenService.GenerateRefreshToken(user);
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return new LoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
            };
        }

        public async Task<LoginResponse> RegisterAsync(User user)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == user.PhoneNumber);
                if (existingUser != null)
                {
                    throw new Exception("Số điện thoại đã đăng ký rồi.");
                }

                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt(12));

                var createUser = new User
                {
                    Name = user.Name,
                    PhoneNumber = user.PhoneNumber,
                    Email = user.Email,
                    Password = hashedPassword,
                    Role = RoleEnum.ADMIN.ToString(),
                    Active = true,
                    IsGoogleAccount = false
                };

                var newUser = await _context.Users.AddAsync(createUser);
                await _context.SaveChangesAsync();
                var getUser = newUser.Entity;

                var tokenExpirationInMinutes = 15;
                var accessToken = _tokenService.GenerateToken(getUser, tokenExpirationInMinutes);
                var refreshToken = _tokenService.GenerateRefreshToken(getUser);

                getUser.RefreshToken = refreshToken;
                getUser.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

                _context.Users.Update(getUser);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return new LoginResponse
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception(ex.Message);
            }
        }

        public async Task<UserDTO> VerifyTokenAsync([FromHeader(Name = "Authorization")] string token)
        {
            if (string.IsNullOrWhiteSpace(token))
                throw new UnauthorizedAccessException("Token không được để trống.");

            try
            {
                // Loại bỏ "Bearer " nếu có
                token = token.Replace("Bearer ", "", StringComparison.OrdinalIgnoreCase);

                // Xác thực token và lấy các claims
                var claimsPrincipal = _tokenService.VerifyToken(token);
                if (claimsPrincipal == null)
                {
                    throw new UnauthorizedAccessException("Token không hợp lệ hoặc đã hết hạn.");
                }

                // Lấy userId từ claims
                var userIdClaim = claimsPrincipal.FindFirst("userId")?.Value;
                if (string.IsNullOrEmpty(userIdClaim))
                {
                    throw new UnauthorizedAccessException("Không tìm thấy ID trong token.");
                }

                Console.WriteLine($"id: {userIdClaim}");

                if (!int.TryParse(userIdClaim, out int userId))
                {
                    throw new UnauthorizedAccessException($"ID trong token không hợp lệ: {userIdClaim}");
                }

                // Tìm người dùng trong cơ sở dữ liệu
                var user = await _context.Users
                    .AsNoTracking()
                    .FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                {
                    throw new KeyNotFoundException("Người dùng không tồn tại.");
                }

                // Trả về DTO chứa thông tin người dùng
                return _mapper.Map<UserDTO>(user);
            }
            catch (Exception ex) when (ex is not UnauthorizedAccessException and not KeyNotFoundException)
            {
                throw new Exception($"Lỗi không xác định: {ex.Message}", ex);
            }
        }




        public async Task<LoginResponse> RefreshTokenAsync(string refreshToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                throw new UnauthorizedAccessException("Invalid or expired refresh token.");
            }


            // Tạo token mới
            string newAccessToken = _tokenService.GenerateToken(user);
            string newRefreshToken = _tokenService.GenerateRefreshToken(user);

            // Cập nhật refresh token mới vào DB
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return new LoginResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }


        public Task<string> ForgotPasswordAsync(string email)
        {
            throw new NotImplementedException();
            //var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            //if (user == null)
            //    throw new Exception("Email không tồn tại.");

            //var resetToken = Guid.NewGuid().ToString(); // Tạo token đặt lại mật khẩu
            //user.ResetPasswordToken = resetToken;
            //user.ResetPasswordExpiry = DateTime.Now.AddHours(1);
            //await _context.SaveChangesAsync();

            //// Gửi email
            //await _emailService.SendEmailAsync(email, "Đặt lại mật khẩu", $"Token: {resetToken}");
            //return "Vui lòng kiểm tra email để đặt lại mật khẩu.";
        }

        public Task<string> ResetPasswordAsync(string email, string newPassword, string token)
        {
            throw new NotImplementedException();
            //var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.ResetPasswordToken == token);
            //if (user == null || user.ResetPasswordExpiry < DateTime.Now)
            //    throw new Exception("Token không hợp lệ hoặc đã hết hạn.");

            //user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
            //user.ResetPasswordToken = null; // Xóa token
            //user.ResetPasswordExpiry = null;
            //await _context.SaveChangesAsync();

            //return "Đặt lại mật khẩu thành công.";
        }

        public async Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new Exception("Người dùng không tồn tại.");
            }

            // Kiểm tra mật khẩu cũ
            if (!BCrypt.Net.BCrypt.Verify(oldPassword, user.Password))
            {
                throw new Exception("Mật khẩu cũ không chính xác.");
            }

            // Băm mật khẩu mới
            string hashedNewPassword = BCrypt.Net.BCrypt.HashPassword(newPassword, BCrypt.Net.BCrypt.GenerateSalt(12));

            user.Password = hashedNewPassword;
            await _context.SaveChangesAsync();

            return true;
        }

    }
}
