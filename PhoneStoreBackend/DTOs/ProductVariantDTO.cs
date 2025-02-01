using PhoneStoreBackend.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.DTOs
{
    public class ProductVariantDTO
    {
        public int ProductVariantId { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int? DiscountId { get; set; }
        public Discount? Discount { get; set; }
        public string Slug { get; set; }
        public string Color { get; set; }
        public string Storage { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }
}
