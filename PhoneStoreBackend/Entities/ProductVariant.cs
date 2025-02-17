using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Entities
{
    public class ProductVariant
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductVariantId { get; set; }

        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        [JsonIgnore]
        public Product Product { get; set; }

        public int? DiscountId { get; set; }
        [ForeignKey("DiscountId")]
        public Discount Discount { get; set; }

        [Required]
        [StringLength(500)]
        public string VariantName { get; set; }

        [StringLength(100)]
        [Required]
        public string Slug { get; set; }

        public string Color { get; set; }
        public string Storage { get; set; }

        [Column(TypeName = "decimal(18, 4)")]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(18, 4)")]
        public decimal ImportPrice { get; set; }

        public int Stock { get; set; }

        [JsonIgnore]
        public ICollection<CartItem> CartItems { get; set; }
        public ICollection<ProductImage> ProductImages { get; set; }
        [JsonIgnore]
        public ICollection<Review> Reviews { get; set; }
        [JsonIgnore]
        public ICollection<WishlistItem> WishlistItems { get; set; }
        public ICollection<ProductSpecification> ProductSpecifications { get; set; }
    }
}
