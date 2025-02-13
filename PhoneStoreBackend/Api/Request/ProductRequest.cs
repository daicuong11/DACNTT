using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class ProductRequest
    {
        [Required(ErrorMessage = "Tên sản phẩm là bắt buộc.")]
        [StringLength(200, ErrorMessage = "Tên sản phẩm không được vượt quá 200 ký tự.")]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required(ErrorMessage = "Mã thương hiệu là bắt buộc.")]
        public int BrandId { get; set; }

        [Required(ErrorMessage = "Mã danh mục là bắt buộc.")]
        public int CategoryId { get; set; }
    }
}
