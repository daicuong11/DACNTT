using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class DiscountRequest
    {
        [Required(ErrorMessage = "Mã giảm giá là bắt buộc.")]
        [StringLength(50, ErrorMessage = "Mã giảm giá không được vượt quá 50 ký tự.")]
        public string Code { get; set; }

        [Required(ErrorMessage = "Phần trăm giảm giá là bắt buộc.")]
        [Range(0.01, 100, ErrorMessage = "Phần trăm giảm giá phải nằm trong khoảng từ 0.01% đến 100%.")]
        public decimal Percentage { get; set; }

        [Required(ErrorMessage = "Ngày bắt đầu là bắt buộc.")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Ngày kết thúc là bắt buộc.")]
        [DateGreaterThan(nameof(StartDate), ErrorMessage = "Ngày kết thúc phải sau ngày bắt đầu.")]
        public DateTime EndDate { get; set; }

        [Required(ErrorMessage = "Trạng thái hoạt động là bắt buộc.")]
        public bool IsActive { get; set; }
    }
}
