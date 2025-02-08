using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class DiscountRequest
    {
        [Required(ErrorMessage = "Phần trăm giảm giá là bắt buộc.")]
        [Range(0.01, 100, ErrorMessage = "Phần trăm giảm giá phải nằm trong khoảng từ 0.01% đến 100%.")]
        public decimal Percentage { get; set; }

        [Required(ErrorMessage = "Trạng thái hoạt động là bắt buộc.")]
        public bool IsActive { get; set; }
    }
}
