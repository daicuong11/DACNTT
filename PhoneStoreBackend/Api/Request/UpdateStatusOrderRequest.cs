using PhoneStoreBackend.Enums;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class UpdateStatusOrderRequest
    {
        [Required(ErrorMessage = "Trạng thái đơn hàng là bắt buộc")]
        [EnumDataType(typeof(OrderStatusEnum))]
        public string Status { get; set; }
    }
}
