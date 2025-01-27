using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.DTOs
{
    public class WishlistItemDTO
    {
        public int WishlistItemId { get; set; }
        public int WishlistId { get; set; }
        public int ProductVariantId { get; set; }
        public ProductVariant ProductVariant { get; set; }
    }
}
