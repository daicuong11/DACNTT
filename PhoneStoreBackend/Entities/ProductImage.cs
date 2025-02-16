using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Entities
{
    public class ProductImage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ImageId { get; set; }

        public int ProductVariantId { get; set; }
        [ForeignKey("ProductVariantId")]
        [JsonIgnore]
        public ProductVariant ProductVariant { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public bool IsMain { get; set; } = false;
    }
}
