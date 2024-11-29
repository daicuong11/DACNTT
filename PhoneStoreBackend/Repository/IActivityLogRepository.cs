using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IActivityLogRepository
    {
        Task<ICollection<ActivityLogDTO>> GetAllAsync();
        Task<ActivityLogDTO> GetLogByIdAsync(int logId);
        Task<ActivityLogDTO> AddLogAsync(ActivityLog activityLog);
    }
}
