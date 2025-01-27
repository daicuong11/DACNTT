using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using PhoneStoreBackend.Entities;

public class Coupon
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CouponId { get; set; }

    [Required(ErrorMessage = "Cần phải có id người tạo coupon")]
    public int Id { get; set; }
    public User User { get; set; }

    [Required]
    [StringLength(50)]
    public string Code { get; set; } // Ví dụ: "SUMMER2024"

    [Required]
    public bool IsPercentage { get; set; } // true = giảm %; false = giảm số tiền cố định

    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal DiscountValue { get; set; } // % hoặc số tiền

    [Column(TypeName = "decimal(18, 2)")] // Định nghĩa kiểu decimal
    public decimal? MinimumOrderAmount { get; set; } // Giá trị tối thiểu để áp dụng mã (có thể null)

    public int? MaxUsageCount { get; set; } // Giới hạn số lần sử dụng (null = không giới hạn)

    public int UsedCount { get; set; } = 0;

    [Required]
    public DateTime StartDate { get; set; }

    [Required]
    public DateTime EndDate { get; set; }

    public bool IsActive { get; set; } = true; // Có khả dụng không

    public ICollection<Order> Orders { get; set; }

}
