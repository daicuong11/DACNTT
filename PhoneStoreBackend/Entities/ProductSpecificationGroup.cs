using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneStoreBackend.Entities
{
    public class ProductSpecificationGroup
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductSpecificationGroupId { get; set; }

        [Required]
        [StringLength(200)]
        public string GroupName { get; set; }

        [Required]
        [StringLength(200)]
        public string Description { get; set; }

        public ICollection<ProductSpecification> ProductSpecifications { get; set; }
    }
}
