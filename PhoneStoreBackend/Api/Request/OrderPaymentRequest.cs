using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class OrderPaymentRequest
    {
        [Required(ErrorMessage = "Mã đơn hàng là bắt buộc.")]
        public int OrderId { get; set; }

        [Required(ErrorMessage = "Số tiền thanh toán là bắt buộc.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Số tiền thanh toán phải lớn hơn 0.")]
        public decimal Amount { get; set; }
    }
}
