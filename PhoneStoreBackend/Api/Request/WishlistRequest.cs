using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class WishlistRequest
    {
        [Required(ErrorMessage = "Mã người dùng là bắt buộc.")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Mã sản phẩm là bắt buộc.")]
        public int ProductVariantId { get; set; }
    }
}
