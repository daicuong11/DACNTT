using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // Lấy tất cả người dùng
        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userRepository.GetAllAsync();
                var response = Response<ICollection<UserDTO>>.CreateSuccessResponse(users, "Danh sách người dùng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        // Lấy người dùng theo ID
        [HttpGet("{id}")]
        //[Authorize]  // Yêu cầu người dùng đăng nhập
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(id);
                var response = Response<UserDTO>.CreateSuccessResponse(user, "Thông tin người dùng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        // Cập nhật tên người dùng
        [HttpPut("update-name/{id}")]
        [Authorize]  // Yêu cầu người dùng đăng nhập
        public async Task<IActionResult> UpdateUserName(int id, [FromBody] string newName)
        {
            try
            {
                var result = await _userRepository.UpdateUserNameAsync(id, newName);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Tên người dùng đã được cập nhật");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy người dùng");
                    return NotFound(errorResponse);
                }
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        // Cập nhật email người dùng
        [HttpPut("update-email/{id}")]
        [Authorize]  // Yêu cầu người dùng đăng nhập
        public async Task<IActionResult> UpdateUserEmail(int id, [FromBody] string newEmail)
        {
            try
            {
                var result = await _userRepository.UpdateUserEmailAsync(id, newEmail);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Email người dùng đã được cập nhật");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy người dùng");
                    return NotFound(errorResponse);
                }
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        // Cập nhật số điện thoại người dùng
        [HttpPut("update-phone/{id}")]
        [Authorize]  // Yêu cầu người dùng đăng nhập
        public async Task<IActionResult> UpdateUserPhoneNumber(int id, [FromBody] string newPhoneNumber)
        {
            try
            {
                var result = await _userRepository.UpdateUserPhoneNumberAsync(id, newPhoneNumber);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Số điện thoại người dùng đã được cập nhật");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy người dùng");
                    return NotFound(errorResponse);
                }
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        // Xóa người dùng theo ID
        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]  // Chỉ Admin mới có quyền xóa người dùng
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var result = await _userRepository.DeleteUserAsync(id);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Người dùng đã bị xóa");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy người dùng");
                    return NotFound(errorResponse);
                }
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        // Cập nhật khóa or mở khóa tài khoản
        [HttpPut("{id}/status")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateUserStatus(int id)
        {
            try
            {
                var user = await _userRepository.UpdateUserStatusAsync(id);
                if (user == null)
                {
                    return NotFound(Response<object>.CreateErrorResponse("Không tìm thấy người dùng"));
                }

                return Ok(Response<object>.CreateSuccessResponse(null, $"Tài khoản đã được {(user.Active ? "mở khóa" : "khóa")}"));
            }
            catch (Exception ex)
            {
                return BadRequest(Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}"));
            }
        }

    }
}
