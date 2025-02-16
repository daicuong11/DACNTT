using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.DTOs
{
    public class ProductSpecificationDTO
    {
        public int SpecificationId { get; set; }
        public int ProductVariantId { get; set; }
        public int ProductSpecificationGroupId { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsSpecial { get; set; }
    }
}
