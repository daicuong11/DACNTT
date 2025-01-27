using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class WishlistItemRequest
    {
        [Required(ErrorMessage = "Mã danh sách yêu thích là bắt buộc.")]
        public int WishlistId { get; set; }

        [Required(ErrorMessage = "Mã biến thể sản phẩm là bắt buộc.")]
        public int ProductVariantId { get; set; }
    }
}
