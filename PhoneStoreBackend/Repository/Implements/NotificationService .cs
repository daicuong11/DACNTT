using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class NotificationService : INotificationRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public NotificationService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả các Notification
        public async Task<ICollection<NotificationDTO>> GetAllNotificationsAsync()
        {
            var notifications = await _context.Notifications.ToListAsync();
            return notifications.Select(n => _mapper.Map<NotificationDTO>(n)).ToList();
        }

        // Lấy Notification theo NotificationId
        public async Task<NotificationDTO> GetNotificationByIdAsync(int notificationId)
        {
            var notification = await _context.Notifications.FirstOrDefaultAsync(n => n.NotificationId == notificationId);
            if (notification == null)
            {
                throw new Exception("Notification not found.");
            }
            return _mapper.Map<NotificationDTO>(notification);
        }

        // Lấy các Notification theo UserId
        public async Task<ICollection<NotificationDTO>> GetNotificationsByUserIdAsync(int userId)
        {
            var notifications = await _context.Notifications.Where(n => n.UserId == userId).ToListAsync();
            return notifications.Select(n => _mapper.Map<NotificationDTO>(n)).ToList();
        }

        // Thêm Notification mới
        public async Task<NotificationDTO> AddNotificationAsync(Notification notification)
        {
            var newNotification = await _context.Notifications.AddAsync(notification);
            await _context.SaveChangesAsync();
            return _mapper.Map<NotificationDTO>(newNotification.Entity);
        }

        // Cập nhật Notification
        public async Task<bool> UpdateNotificationAsync(int notificationId, Notification notification)
        {
            var existingNotification = await _context.Notifications.FindAsync(notificationId);
            if (existingNotification == null)
            {
                throw new Exception("Notification not found.");
            }

            existingNotification.Title = notification.Title;
            existingNotification.Message = notification.Message;
            existingNotification.IsRead = notification.IsRead;

            _context.Notifications.Update(existingNotification);
            await _context.SaveChangesAsync();

            return true;
        }

        // Xóa Notification
        public async Task<bool> DeleteNotificationAsync(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null)
            {
                throw new Exception("Notification not found.");
            }

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return true;
        }

        // Đánh dấu Notification là đã đọc
        public async Task<bool> MarkAsReadAsync(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null)
            {
                throw new Exception("Notification not found.");
            }

            notification.IsRead = true;
            _context.Notifications.Update(notification);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
