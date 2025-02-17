using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Api.Response
{
    public class VariantBasicResponse
    {
        public int ProductVariantId { get; set; }

        public string FullNameVariant { get; set; }

        public int ProductId { get; set; }

        public Brand Brand {  get; set; }
        
        public Category Category { get; set; }

        public decimal DiscountPercentage { get; set; }

        public string Slug { get; set; }
        public string Color { get; set; }
        public string Storage { get; set; }
        public decimal Price { get; set; }
        public decimal ImportPrice { get; set; }
        public int Stock { get; set; }

        public string ImageUrl { get; set; }
    }
}
