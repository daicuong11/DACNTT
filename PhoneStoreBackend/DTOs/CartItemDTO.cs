using PhoneStoreBackend.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.DTOs
{
    public class CartItemDTO
    {
        public int CartItemId { get; set; }

        public int CartId { get; set; }
        public int ProductVariantId { get; set; }
        public ProductVariant ProductVariant { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
