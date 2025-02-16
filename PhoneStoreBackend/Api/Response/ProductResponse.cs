using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Api.Response
{
    public class ProductResponse
    {
        public int ProductId { get; set; }
        public string Name { get; set; }

        public CategoryRespone Category { get; set; }

        public BrandResponse Brand { get; set; }

        public ICollection<ProductVariantResponse> ProductVariants { get; set; }
    }
}
