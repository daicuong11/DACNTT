using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class PaymentRequest
    {
        [Required(ErrorMessage = "Mã đơn hàng là bắt buộc.")]
        public int OrderId { get; set; }

        [Required(ErrorMessage = "Phương thức thanh toán là bắt buộc.")]
        [StringLength(50, ErrorMessage = "Phương thức thanh toán không được vượt quá 50 ký tự.")]
        public string PaymentMethod { get; set; }

        [Required(ErrorMessage = "Trạng thái thanh toán là bắt buộc.")]
        [StringLength(50, ErrorMessage = "Trạng thái thanh toán không được vượt quá 50 ký tự.")]
        public string PaymentStatus { get; set; }

        [Required(ErrorMessage = "Số tiền thanh toán là bắt buộc.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Số tiền thanh toán phải lớn hơn 0.")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "Ngày thanh toán là bắt buộc.")]
        public DateTime PaymentDate { get; set; }
    }
}
