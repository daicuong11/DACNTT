using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneStoreBackend.Entities
{
    public class ProductSpecification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SpecificationId { get; set; }

        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }

        [Required]
        [StringLength(100)]
        public string Key { get; set; } // Ví dụ: "CPU", "RAM"

        [Required]
        [StringLength(500)]
        public string Value { get; set; } // Ví dụ: "Snapdragon 888", "8GB"
    }
}
