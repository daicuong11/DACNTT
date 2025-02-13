using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class AddProductRequest
    {
        [Required(ErrorMessage ="Cần đẩy đủ thông tin của sản phẩm")]
        public ProductRequest Product { get; set; }
        [Required(ErrorMessage = "Cần đẩy đủ thông tin phiên bản")]
        [MinLength(1, ErrorMessage = "Danh sách phiên bản phải ít nhất 1 phiên bản")]
        public List<ListVariantRequest> listVariant { get; set; }

    }
}
