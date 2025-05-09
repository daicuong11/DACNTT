﻿using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class AddProductVariantRequest
    {
        [Required(ErrorMessage = "Name là bắt buộc")]
        public string VariantName { get; set; }

        [Required(ErrorMessage = "Slug là bắt buộc")]
        public string Slug { get; set; }

        [Required(ErrorMessage = "Màu sắc là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Màu sắc không được vượt quá 50 ký tự.")]
        public string Color { get; set; }

        [Required(ErrorMessage = "Dung lượng bộ nhớ là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Dung lượng bộ nhớ không được vượt quá 50 ký tự.")]
        public string Storage { get; set; }

        [Required(ErrorMessage = "Giá sản phẩm là bắt buộc.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Giá sản phẩm phải lớn hơn 0.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Giá nhập sản phẩm là bắt buộc.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Giá nhập sản phẩm phải lớn hơn 0.")]
        public decimal ImportPrice { get; set; }

        [Required(ErrorMessage = "Số lượng tồn kho là bắt buộc.")]
        [Range(0, int.MaxValue, ErrorMessage = "Số lượng tồn kho không được âm.")]
        public int Stock { get; set; }
        public int? DiscountId { get; set; }
    }
}
