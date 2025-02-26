using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Enums;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;
using System.Security.Claims;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authService;
        private readonly IUserRepository _userService;
        private readonly ITokenRepository _tokenService;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository authService, IUserRepository userService, ITokenRepository tokenService, IMapper mapper)
        {
            _authService = authService;
            _userService = userService;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        // Đăng nhập
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var loginResult = await _authService.LoginAsync(model.PhoneNumber, model.Password);
                var response = Response<LoginResponse>.CreateSuccessResponse(loginResult, "Login Successfully");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = Response<object>.CreateErrorResponse(ex.Message);
                return BadRequest(response);
            }
        }
        [HttpGet("login-google")]
        public IActionResult LoginWithGoogle()
        {
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("HandleGoogleCallback", "Auth")
            };

            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        //[HttpGet("google-callback", Name = "google-callback")]
        //[AllowAnonymous]
        //public async Task<IActionResult> HandleGoogleCallback()
        //{
        //    var result = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);

        //    if (!result.Succeeded)
        //    {
        //        return Unauthorized(Response<object>.CreateErrorResponse("Google authentication failed"));
        //    }

        //    var claims = result.Principal?.Identities.FirstOrDefault()?.Claims;
        //    var email = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        //    var fullName = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

        //    if (string.IsNullOrEmpty(email))
        //    {
        //        return BadRequest(Response<object>.CreateErrorResponse("Email is required from Google."));
        //    }

        //    var user = await _userService.GetUserByEmailAsync(email);

        //    var tokenExpirationInMinutes = 15;

        //    UserDTO userDTO;

        //    if (user != null)
        //    {
        //        var newUser = new User
        //        {
        //            Name = fullName,
        //            Email = email,
        //            IsGoogleAccount = true,
        //            Role = RoleEnum.CUSTOMER.ToString(),
        //            Active = true
        //        };

        //        userDTO = await _userService.AddUserAsync(newUser);

        //    }
        //    else
        //    {
        //        userDTO = _mapper.Map<UserDTO>(user);
        //    }

        //    if (userDTO == null) return BadRequest(Response<object>.CreateErrorResponse("Tạo tài khoản hoặc đăng nhập thất bại"));

        //    var accessToken = _tokenService.GenerateToken(userDTO, tokenExpirationInMinutes);
        //    var refreshToken = _tokenService.GenerateRefreshToken(userDTO);

        //    var loginResult = new LoginResponse
        //    {
        //        AccessToken = accessToken,
        //        RefreshToken = refreshToken,
        //    };
        //    var response = Response<LoginResponse>.CreateSuccessResponse(loginResult, "Login Google Account Successfully");

        //    return Ok(response);
        //}

        // Đăng ký
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest registerReq)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createUser = new User
                {
                    Name = registerReq.name,
                    PhoneNumber = registerReq.phoneNumber,
                    Email = registerReq.Email,
                    Password = registerReq.Password,
                };

                var result = await _authService.RegisterAsync(createUser);
                var response = Response<LoginResponse>.CreateSuccessResponse(result, "Register Successfully");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = Response<object>.CreateErrorResponse(ex.Message);
                return BadRequest(response);
            }
        }

        // Đăng xuất
        [HttpGet("logout")]
        public IActionResult Logout()
        {
            return SignOut(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpGet("verify")]
        [Authorize]
        public async Task<IActionResult> VerifyToken([FromHeader(Name = "Authorization")] string Authorization)
        {
            try
            {
                var responseError = InputValidator.CheckInput(Authorization, "Token");
                if (responseError != null)
                    return BadRequest(responseError);

                if (Authorization.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                    Authorization = Authorization.Substring(7);

                var user = await _authService.VerifyTokenAsync(Authorization);
                if (user == null)
                {
                    var responseErr = Response<object>.CreateErrorResponse("Xác thực không thành công");
                    return BadRequest(responseErr);
                }

                var response = Response<UserDTO>.CreateSuccessResponse(user, "Verify Token Successfully");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = Response<object>.CreateErrorResponse(ex.Message);
                return BadRequest(response);
            }
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest refreshToken)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                if (refreshToken.RefreshToken.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                    refreshToken.RefreshToken = refreshToken.RefreshToken.Substring(7);

                var newToken = await _authService.RefreshTokenAsync(refreshToken.RefreshToken);
                var response = Response<LoginResponse>.CreateSuccessResponse(newToken, "Refresh Token Successfully");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = Response<object>.CreateErrorResponse(ex.Message);
                return BadRequest(response);
            }
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] FogetPasswordRequest request)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var result = await _authService.ForgotPasswordAsync(request.Email);
                var response = Response<object>.CreateSuccessResponse(new { Message = result }, "Send code to mail successfully");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = Response<object>.CreateErrorResponse(ex.Message);
                return BadRequest(response);
            }
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ChangePasswordRequest changePwdReq)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var result = await _authService.ChangePasswordAsync(changePwdReq.UserId, changePwdReq.OldPassword, changePwdReq.NewPassword);
                if(!result)
                {
                    responseError = Response<object>.CreateErrorResponse("Đổi mật khẩu thất bại");
                    return BadRequest(responseError);
                }
                var response = Response<object>.CreateSuccessResponse(null, "Đổi mật khẩu thành công");

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = Response<object>.CreateErrorResponse(ex.Message);
                return BadRequest(response);
            }
        }
    }
}
