using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class ProductImageRequest
    {
        [Required(ErrorMessage = "Mã biến thể sản phẩm là bắt buộc.")]
        public int ProductVariantId { get; set; }

        [Required(ErrorMessage = "Hình ảnh là bắt buộc.")]
        public IFormFile Image { get; set; }

        [Required(ErrorMessage = "Trường chính của hình ảnh là bắt buộc.")]
        public bool IsMainImage { get; set; }
    }
}
