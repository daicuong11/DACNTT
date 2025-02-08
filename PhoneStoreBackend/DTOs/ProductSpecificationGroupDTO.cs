using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.DTOs
{
    public class ProductSpecificationGroupDTO
    {
        public int ProductSpecificationGroupId { get; set; }
        public string GroupName { get; set; }
        public int DisplayOrder { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
