namespace PhoneStoreBackend.DTOs
{
    public class NotificationDTO
    {
        public int NotificationId { get; set; }
        public int User { get; set; }
        public int Sender { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
