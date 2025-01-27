using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class OrderDetailRequest
    {
        [Required(ErrorMessage = "Mã đơn hàng là bắt buộc.")]
        public int OrderId { get; set; }

        [Required(ErrorMessage = "Mã biến thể sản phẩm là bắt buộc.")]
        public int ProductVariantId { get; set; }

        [Required(ErrorMessage = "Số lượng là bắt buộc.")]
        [Range(1, int.MaxValue, ErrorMessage = "Số lượng phải lớn hơn 0.")]
        public int Quantity { get; set; }

        [Required(ErrorMessage = "Giá đơn vị là bắt buộc.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Giá đơn vị phải lớn hơn 0.")]
        public decimal UnitPrice { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Giảm giá không thể âm.")]
        public decimal Discount { get; set; }

        [Required(ErrorMessage = "Giá cuối cùng là bắt buộc.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Giá cuối cùng phải lớn hơn 0.")]
        public decimal Price { get; set; }
    }
}
