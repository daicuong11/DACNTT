using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneStoreBackend.Entities
{
    public class Discount
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DiscountId { get; set; }

        [Required]
        [StringLength(50)]
        public string Code { get; set; } // Discount code

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        [Range(0, 100)]
        public decimal Percentage { get; set; } // Discount percentage

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
