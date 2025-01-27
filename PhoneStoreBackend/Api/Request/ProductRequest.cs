using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class ProductRequest
    {
        [Required(ErrorMessage = "Slug sản phẩm là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Slug không được vượt quá 100 ký tự.")]
        public string Slug { get; set; }

        [Required(ErrorMessage = "Tên sản phẩm là bắt buộc.")]
        [StringLength(200, ErrorMessage = "Tên sản phẩm không được vượt quá 200 ký tự.")]
        public string Name { get; set; }

        [StringLength(1000, ErrorMessage = "Mô tả sản phẩm không được vượt quá 1000 ký tự.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Mã thương hiệu là bắt buộc.")]
        public int BrandId { get; set; }

        [Required(ErrorMessage = "Mã danh mục là bắt buộc.")]
        public int CategoryId { get; set; }
    }
}
