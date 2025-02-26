using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request.GHN
{
    public class AddGHNOrderRequest
    {
        [Required(ErrorMessage = "Mã đơn hàng là bắt buộc")]
        public int OrderId { get; set; }
    }
}
