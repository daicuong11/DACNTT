using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class ListVariantRequest
    {

        [Required(ErrorMessage = "Cần đẩy đủ thông tin của phiên bản sản phẩm")]
        public ProductVariantRequest Variant { get; set; }
        [Required(ErrorMessage = "Cần thông số kĩ thuật của sản phẩm")]
        public List<AddSpecificationRequest> Specifications { get; set; }
        [Required(ErrorMessage = "Cần ít nhất một hình của sản phẩm")]
        [MinLength(1, ErrorMessage = "Danh sách hình ảnh không được để trống")]
        public List<AddProductImageRequest> ProductImages { get; set; }
    }
}
