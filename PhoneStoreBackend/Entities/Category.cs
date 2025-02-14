using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Entities
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public string Description { get; set; } = "";

        public string ImageUrl { get; set; }

        [JsonIgnore]
        public ICollection<Product> Products { get; set; }
        
        public ICollection<ProductSpecificationGroup> ProductSpecificationGroups { get; set; }
    }
}
