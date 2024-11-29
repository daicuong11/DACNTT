using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface INotificationRepository
    {
        Task<ICollection<NotificationDTO>> GetAllNotificationsAsync();
        Task<NotificationDTO> GetNotificationByIdAsync(int notificationId);
        Task<ICollection<NotificationDTO>> GetNotificationsByUserIdAsync(int userId);
        Task<NotificationDTO> AddNotificationAsync(Notification notification);
        Task<bool> UpdateNotificationAsync(int notificationId, Notification notification);
        Task<bool> DeleteNotificationAsync(int notificationId);
        Task<bool> MarkAsReadAsync(int notificationId);
    }
}
