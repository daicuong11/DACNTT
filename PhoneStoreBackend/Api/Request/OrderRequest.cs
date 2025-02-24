using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneStoreBackend.Api.Request
{
    public class OrderRequest
    {
        [Required(ErrorMessage = "Mã người dùng là bắt buộc.")]
        public int UserId { get; set; }

        public int? CouponId { get; set; }

        [Required(ErrorMessage = "Địa chỉ giao hàng là bắt buộc.")]
        [StringLength(200, ErrorMessage = "Địa chỉ giao hàng không được vượt quá 200 ký tự.")]
        public string ShippingAddress { get; set; }

        [StringLength(500, ErrorMessage = "Ghi chú không được vượt quá 500 ký tự.")]
        public string Note { get; set; }

        [Required(ErrorMessage = "Tổng số tiền là bắt buộc.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Tổng số tiền phải lớn hơn 0.")]
        public decimal ShippingFee { get; set; }

        [Required(ErrorMessage = "Tổng số tiền là bắt buộc.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Tổng số tiền phải lớn hơn 0.")]
        public decimal TotalAmount { get; set; }

        public ICollection<OrderDetailRequest> orderDetailRequests { get; set; }
    }
}
