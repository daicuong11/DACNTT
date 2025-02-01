using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class ActivityLogService : IActivityLogRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ActivityLogService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả Activity Logs
        public async Task<ICollection<ActivityLogDTO>> GetAllAsync()
        {
            var activityLogs = await _context.ActivityLogs
                                              .Include(a => a.User) // Bao gồm thông tin User
                                              .ToListAsync();
            return activityLogs.Select(a => _mapper.Map<ActivityLogDTO>(a)).ToList();
        }

        // Lấy Activity Log theo LogId
        public async Task<ActivityLogDTO> GetLogByIdAsync(int logId)
        {
            var log = await _context.ActivityLogs
                                     .Include(a => a.User)
                                     .FirstOrDefaultAsync(a => a.LogId == logId);

            if (log == null)
            {
                throw new KeyNotFoundException("Activity Log not found.");
            }

            return _mapper.Map<ActivityLogDTO>(log);
        }

        // Thêm Activity Log mới
        public async Task<ActivityLogDTO> AddLogAsync(ActivityLog activityLog)
        {
            var newLog = await _context.ActivityLogs.AddAsync(activityLog);
            await _context.SaveChangesAsync();
            return _mapper.Map<ActivityLogDTO>(newLog.Entity);
        }
    }
}
