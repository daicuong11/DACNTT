namespace PhoneStoreBackend.Api.Response
{
    public class ProductVariantResponse
    {
        public int VariantId { get; set; }
        public string Slug { get; set; }
        public string VariantName { get; set; }

        public string ScreenSize { get; set; }
        public string RAM { get; set; }
        public string Storage { get; set; }

        public string Color { get; set; }

        public string ImageUrl { get; set; }

        public decimal Price { get; set; }
        public decimal ImportPrice { get; set; }
        public decimal DiscountPercentage { get; set; }
        public string CategoryName { get; set; }
        public string BrandName { get; set; }
        public int Stock {  get; set; }

        public double ReviewRate { get; set; }
    }
}
