using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/notifications")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationController(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllNotifications()
        {
            try
            {
                var notifications = await _notificationRepository.GetAllNotificationsAsync();
                var response = Response<ICollection<NotificationDTO>>.CreateSuccessResponse(notifications, "Danh sách thông báo");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetNotificationById(int id)
        {
            try
            {
                var notification = await _notificationRepository.GetNotificationByIdAsync(id);
                if (notification == null)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Thông báo không tồn tại.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<NotificationDTO>.CreateSuccessResponse(notification, "Chi tiết thông báo");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetNotificationsByUserId(int userId)
        {
            try
            {
                var notifications = await _notificationRepository.GetNotificationsByUserIdAsync(userId);
                var response = Response<ICollection<NotificationDTO>>.CreateSuccessResponse(notifications, "Thông báo của người dùng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> AddNotification([FromBody] NotificationRequest notification)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createNotifi = new Notification
                {
                    Id = notification.Id,
                    SenderId = notification.SenderId,
                    Title = notification.Title,
                    Message = notification.Message,
                    IsRead = notification.IsRead,
                    CreatedAt = DateTime.Now
                };
                var createdNotification = await _notificationRepository.AddNotificationAsync(createNotifi);
                var response = Response<NotificationDTO>.CreateSuccessResponse(createdNotification, "Thông báo đã được thêm thành công");
                return CreatedAtAction(nameof(GetNotificationById), new { id = createdNotification.NotificationId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateNotification(int id, [FromBody] NotificationRequest notification)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createNotifi = new Notification
                {
                    Id = notification.Id,
                    SenderId = notification.SenderId,
                    Title = notification.Title,
                    Message = notification.Message,
                    IsRead = notification.IsRead,
                    CreatedAt = DateTime.Now
                };
                var result = await _notificationRepository.UpdateNotificationAsync(id, createNotifi);
                if (!result)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Thông báo không tồn tại.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Thông báo đã được cập nhật thành công");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            try
            {
                var result = await _notificationRepository.DeleteNotificationAsync(id);
                if (!result)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Thông báo không tồn tại.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Thông báo đã được xóa thành công");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPatch("{id}/mark-as-read")]
        [Authorize]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            try
            {
                var result = await _notificationRepository.MarkAsReadAsync(id);
                if (!result)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Thông báo không tồn tại.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Thông báo đã được đánh dấu là đã đọc");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }
    }
}
