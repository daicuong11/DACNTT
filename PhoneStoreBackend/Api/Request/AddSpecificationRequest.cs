using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class AddSpecificationRequest
    {

        [Required(ErrorMessage = "Mã nhóm đặc tả là bắt buộc.")]
        public int SpecificationGroupId { get; set; }

        [Required(ErrorMessage = "Mã phiên bản sản phẩm là bắt buộc.")]
        public int ProductVariantId { get; set; }

        [Required(ErrorMessage = "Khóa đặc tả là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Khóa đặc tả không được vượt quá 100 ký tự.")]
        public string Key { get; set; }

        [Required(ErrorMessage = "Giá trị đặc tả là bắt buộc.")]
        [StringLength(500, ErrorMessage = "Giá trị đặc tả không được vượt quá 500 ký tự.")]
        public string Value { get; set; }

        [Required(ErrorMessage = "Thứ tự hiển thị là bắt buộc.")]
        [Range(0, int.MaxValue, ErrorMessage = "Thứ tự hiển thị phải là số không âm.")]
        public int DisplayOrder { get; set; }

        [Required(ErrorMessage = "Trường đặc biệt là bắt buộc.")]
        public bool IsSpecial { get; set; }
    }
}
