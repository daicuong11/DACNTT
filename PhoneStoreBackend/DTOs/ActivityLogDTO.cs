namespace PhoneStoreBackend.DTOs
{
    public class ActivityLogDTO
    {
        public int LogId { get; set; }
        public int UserId { get; set; }
        public string Action { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
