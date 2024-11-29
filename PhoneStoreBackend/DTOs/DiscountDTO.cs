namespace PhoneStoreBackend.DTOs
{
    public class DiscountDTO
    {
        public int DiscountId { get; set; }
        public string Code { get; set; }
        public decimal Percentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}
