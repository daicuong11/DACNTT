using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneStoreBackend.Entities
{
    public class ProductVariant
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductVariantId { get; set; }

        public int ProdcutId { get; set; }
        [ForeignKey("ProdcutId")]
        public Product Product { get; set; }

        public int? DiscountId { get; set; }
        [ForeignKey("DiscountId")]
        public Discount? Discount { get; set; }
        [StringLength(100)]
        public string Color { get; set; }
        public string Storage {  get; set; }
        public decimal Price { get; set; }
        public int Stock {  get; set; }

        public ICollection<CartItem> CartItems { get; set; }
        public ICollection<ProductImage> ProductImages { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<WishlistItem> WishlistItems { get; set; }
        public ICollection<ProductSpecification> ProductSpecifications { get; set; }
    }
}
