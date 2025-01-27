using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class ProductImageRequest
    {
        [Required(ErrorMessage = "Mã biến thể sản phẩm là bắt buộc.")]
        public int ProductVariantId { get; set; }

        [Required(ErrorMessage = "URL hình ảnh là bắt buộc.")]
        [StringLength(500, ErrorMessage = "URL hình ảnh không được vượt quá 500 ký tự.")]
        public string ImageUrl { get; set; }

        [Required(ErrorMessage = "Trường chính của hình ảnh là bắt buộc.")]
        public bool IsMainImage { get; set; }
    }
}
