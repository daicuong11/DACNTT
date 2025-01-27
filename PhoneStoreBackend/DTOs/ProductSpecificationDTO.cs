using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.DTOs
{
    public class ProductSpecificationDTO
    {
        public int SpecificationId { get; set; }
        public int ProductVariantId { get; set; }
        public ProductVariant ProductVariant { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
