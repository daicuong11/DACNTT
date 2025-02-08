namespace PhoneStoreBackend.DTOs
{
    public class DiscountDTO
    {
        public int DiscountId { get; set; }
        public decimal Percentage { get; set; }
        public bool IsActive { get; set; }
    }
}
