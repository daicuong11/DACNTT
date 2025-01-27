using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class CartItemRequest
    {
        [Required(ErrorMessage = "Mã giỏ hàng là bắt buộc.")]
        public int CartId { get; set; }

        [Required(ErrorMessage = "Mã biến thể sản phẩm là bắt buộc.")]
        public int ProductVariantId { get; set; }

        [Required(ErrorMessage = "Số lượng là bắt buộc.")]
        [Range(1, int.MaxValue, ErrorMessage = "Số lượng phải lớn hơn hoặc bằng 1.")]
        public int Quantity { get; set; }
    }
}
