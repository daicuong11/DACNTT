namespace PhoneStoreBackend.DTOs
{
    public class CouponDTO
    {
        public int CouponId { get; set; }
        public string Code { get; set; }
        public bool IsPercentage { get; set; }
        public decimal DiscountValue { get; set; }
        public decimal? MinimumOrderAmount { get; set; }
        public int? MaxUsageCount { get; set; }
        public int UsedCount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}
