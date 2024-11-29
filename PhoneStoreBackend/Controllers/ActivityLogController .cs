using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/activity-logs")]
    [ApiController]
    public class ActivityLogController : ControllerBase
    {
        private readonly IActivityLogRepository _activityLogRepository;

        public ActivityLogController(IActivityLogRepository activityLogRepository)
        {
            _activityLogRepository = activityLogRepository;
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAllLogs()
        {
            try
            {
                var logs = await _activityLogRepository.GetAllAsync();
                var response = Response<ICollection<ActivityLogDTO>>.CreateSuccessResponse(logs, "Danh sách nhật ký hoạt động");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetLogById(int id)
        {
            try
            {
                var log = await _activityLogRepository.GetLogByIdAsync(id);
                if (log == null)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Nhật ký hoạt động không tồn tại.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<ActivityLogDTO>.CreateSuccessResponse(log, "Chi tiết nhật ký hoạt động");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddLog([FromBody] ActivityLogDTO logDto)
        {
            try
            {
                var log = new ActivityLog
                {
                    Action = logDto.Action,
                    UserId = logDto.UserId,
                    Timestamp = logDto.Timestamp
                };

                var createdLog = await _activityLogRepository.AddLogAsync(log);
                var response = Response<ActivityLogDTO>.CreateSuccessResponse(createdLog, "Nhật ký hoạt động đã được thêm thành công");
                return CreatedAtAction(nameof(GetLogById), new { id = createdLog.LogId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }
    }
}
