using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Enums;
using System.Security.Claims;

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

            var userDTO = _mapper.Map<UserDTO>(user);

            var accessToken = _tokenService.GenerateToken(userDTO, tokenExpirationInMinutes);
            var refreshToken = _tokenService.GenerateRefreshToken(userDTO);

            return new LoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                ExpiresIn = tokenExpirationInMinutes * 60,
                User = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.PhoneNumber,
                    user.ProfilePicture,
                    user.Role
                }
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
                    Role = RoleEnum.CUSTOMER.ToString(),
                    Active = true,
                    IsGoogleAccount = false
                };

                var newUser = await _userService.AddUserAsync(createUser);

                var tokenExpirationInMinutes = 15;
                var accessToken = _tokenService.GenerateToken(newUser, tokenExpirationInMinutes);
                var refreshToken = _tokenService.GenerateRefreshToken(newUser);

                await transaction.CommitAsync();

                return new LoginResponse
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                    ExpiresIn = tokenExpirationInMinutes * 60,
                    User = new
                    {
                        user.Id,
                        user.Name,
                        user.Email,
                        user.PhoneNumber,
                        user.ProfilePicture,
                        user.Role
                    }
                };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception($"Lỗi khi đăng ký tài khoản: {ex.Message}");
            }
        }

        public async Task<UserDTO> VerifyTokenAsync([FromHeader(Name = "Authorization")] string token)
        {
            if (string.IsNullOrWhiteSpace(token))
                throw new UnauthorizedAccessException("Token không được để trống.");

            try
            {
                // Xác thực token và lấy các claims
                var claims = _tokenService.VerifyToken(token)
                    ?? throw new UnauthorizedAccessException("Token không hợp lệ.");

                // Lấy userId từ claims
                var userId = int.TryParse(claims.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var id) ? id
                    : throw new UnauthorizedAccessException("Token không chứa thông tin người dùng hợp lệ.");

                // Tìm người dùng trong cơ sở dữ liệu
                var user = await _context.Users
                    .AsNoTracking()
                    .FirstOrDefaultAsync(u => u.Id == userId)
                    ?? throw new KeyNotFoundException("Người dùng không tồn tại.");

                // Trả về DTO chứa thông tin người dùng
                return _mapper.Map<UserDTO>(user);
            }
            catch (Exception ex) when (ex is not UnauthorizedAccessException and not KeyNotFoundException)
            {
                throw new Exception($"Lỗi không xác định: {ex.Message}", ex);
            }
        }


        public async Task<object> RefreshTokenAsync(string refreshToken)
        {
            try
            {
                if (_tokenService.VerifyRefreshToken(refreshToken) is not { } principal)
                    throw new UnauthorizedAccessException("Refresh token không hợp lệ hoặc đã hết hạn.");

                var userIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier)
                    ?? throw new UnauthorizedAccessException("Token không chứa thông tin người dùng.");

                if (!int.TryParse(userIdClaim.Value, out var userId))
                    throw new UnauthorizedAccessException("ID người dùng không hợp lệ trong token.");

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId)
                    ?? throw new KeyNotFoundException($"Người dùng không tồn tại. ID= {userId}");

                var tokenExpirationInMinutes = 15;
                var userDTO = _mapper.Map<UserDTO>(user);
                var newToken = _tokenService.GenerateToken(userDTO, tokenExpirationInMinutes);

                return new
                {
                    AccessToken = newToken,
                    ExpiresIn = tokenExpirationInMinutes * 60,
                };
            }
            catch (UnauthorizedAccessException ex)
            {
                throw new Exception($"Lỗi xác thực: {ex.Message}");
            }
            catch (Exception ex)
            {
                throw new Exception($"Lỗi hệ thống: {ex.Message}");
            }
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
    }
}
