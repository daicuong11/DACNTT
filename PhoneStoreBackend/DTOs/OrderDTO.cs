using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.DTOs
{
    public class OrderDTO
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public int PaymentID { get; set; }
        public Payment Payment { get; set; }
        public int? CouponId { get; set; }
        public Coupon Coupon { get; set; }
        public Customer Customer { get; set; }

        public string Note { get; set; } = string.Empty;

        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public decimal TotalAmount { get; set; }
        public string ShippingAddress { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
