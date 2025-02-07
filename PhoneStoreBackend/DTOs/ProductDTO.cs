namespace PhoneStoreBackend.DTOs
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }
        public CategoryDTO Category { get; set; }

        public int BrandId { get; set; }
        public BrandDTO Brand { get; set; }
    }
}
