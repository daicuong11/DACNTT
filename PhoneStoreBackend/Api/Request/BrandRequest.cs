using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class BrandRequest
    {
        [Required(ErrorMessage = "Tên thương hiệu là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Tên thương hiệu không được vượt quá 100 ký tự.")]
        public string Name { get; set; }

        [StringLength(500, ErrorMessage = "Mô tả không được vượt quá 500 ký tự.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Vui lòng cung cấp URL hình ảnh.")]
        [Url(ErrorMessage = "Định dạng URL hình ảnh không hợp lệ.")]
        public string ImageUrl { get; set; }
    }
}
