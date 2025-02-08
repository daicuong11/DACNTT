using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class AddProductRequest
    {
        public int? DiscountId { get; set; }
        [Required(ErrorMessage = "Sản phẩm là bắt buộc.")]
        public ProductRequest Product { get; set; }
        public List<AddProductVariantRequest> ProductVariants { get; set; }
    }
}
