using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Entities
{
    public class Discount
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DiscountId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        [Range(0, 100)]
        public decimal Percentage { get; set; } // Discount percentage

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public bool IsActive { get; set; } = true;
        [JsonIgnore]
        public ICollection<ProductVariant> Products { get; set; }
    }
}
