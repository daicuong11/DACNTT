using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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

        public int DisplayOrder { get; set; }

        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        [JsonIgnore]
        public Category Category { get; set; }
        public ICollection<ProductSpecification> ProductSpecifications { get; set; }
    }
}
