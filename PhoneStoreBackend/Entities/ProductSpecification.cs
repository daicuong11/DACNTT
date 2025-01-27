using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneStoreBackend.Entities
{
    public class ProductSpecification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SpecificationId { get; set; }

        [Required]
        public int ProductVariantId { get; set; }
        [ForeignKey("ProductVariantId")]
        public ProductVariant ProductVariant { get; set; }

        [Required]

        public int ProductSpecificationGroupId { get; set; }
        [ForeignKey("SpecificationGroupId")]
        public ProductSpecificationGroup ProductSpecificationGroup { get; set; }

        [Required]
        [StringLength(100)]
        public string Key { get; set; } 

        [Required]
        [StringLength(500)]
        public string Value { get; set; }

        [Required]
        public int DisplayOrder {  get; set; }

        [Required]
        public bool IsSpecial { get; set; }
    }
}
