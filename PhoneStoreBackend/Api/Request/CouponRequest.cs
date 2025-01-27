using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class CouponRequest
    {
        [Required(ErrorMessage = "Mã giảm giá là bắt buộc.")]
        [StringLength(50, ErrorMessage = "Mã giảm giá không được vượt quá 50 ký tự.")]
        public string Code { get; set; }

        [Required(ErrorMessage = "Trường IsPercentage là bắt buộc.")]
        public bool IsPercentage { get; set; }

        [Required(ErrorMessage = "Giá trị giảm giá là bắt buộc.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Giá trị giảm giá phải lớn hơn 0.")]
        public decimal DiscountValue { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Số tiền tối thiểu cho đơn hàng không được âm.")]
        public decimal? MinimumOrderAmount { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Số lần sử dụng tối đa không được âm.")]
        public int? MaxUsageCount { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Số lần đã sử dụng không được âm.")]
        public int UsedCount { get; set; }

        [Required(ErrorMessage = "Ngày bắt đầu là bắt buộc.")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Ngày kết thúc là bắt buộc.")]
        [DateGreaterThan(nameof(StartDate), ErrorMessage = "Ngày kết thúc phải sau ngày bắt đầu.")]
        public DateTime EndDate { get; set; }

        [Required(ErrorMessage = "Trạng thái hoạt động là bắt buộc.")]
        public bool IsActive { get; set; }

        [Required(ErrorMessage = "Mã người dùng là bắt buộc.")]
        public int userId { get; set; }
    }

    // Custom attribute for date validation
    public class DateGreaterThanAttribute : ValidationAttribute
    {
        private readonly string _comparisonProperty;

        public DateGreaterThanAttribute(string comparisonProperty)
        {
            _comparisonProperty = comparisonProperty;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var currentValue = value as DateTime?;
            var comparisonValue = validationContext
                .ObjectInstance
                .GetType()
                .GetProperty(_comparisonProperty)
                .GetValue(validationContext.ObjectInstance, null) as DateTime?;

            if (currentValue != null && comparisonValue != null && currentValue <= comparisonValue)
            {
                return new ValidationResult(ErrorMessage ?? "Ngày phải lớn hơn ngày bắt đầu.");
            }

            return ValidationResult.Success;
        }
    }
}
