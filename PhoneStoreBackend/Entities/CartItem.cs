using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Entities
{
    public class CartItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CartItemId { get; set; }

        public int CartId { get; set; }
        [ForeignKey("CartId")]
        [JsonIgnore]
        public Cart Cart { get; set; }

        public int ProductVariantId { get; set; }
        [ForeignKey("ProductVariantId")]
        public ProductVariant ProductVariant { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
