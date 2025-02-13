namespace PhoneStoreBackend.DTOs
{
    public class ProductImageDTO
    {
        public int ImageId { get; set; }
        public int ProductVariantId { get; set; }
        public string ImageUrl { get; set; }
        public bool Ismain { get; set; } = false;

    }
}
