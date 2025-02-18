using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class PayCODRequest
    {
        [Required(ErrorMessage ="Mã đơn hàng là bắt buộc")]
        public int OrderId { get; set; }

        [Required(ErrorMessage ="Tổng tiền đơn hàng là bắt buộc")]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }
    }
}
