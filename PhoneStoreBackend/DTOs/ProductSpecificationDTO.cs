namespace PhoneStoreBackend.DTOs
{
    public class ProductSpecificationDTO
    {
        public int SpecificationId { get; set; }
        public int ProductId { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
