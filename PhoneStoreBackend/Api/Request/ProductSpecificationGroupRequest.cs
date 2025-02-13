using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class ProductSpecificationGroupRequest
    {
        [Required(ErrorMessage = "Tên nhóm đặc tả là bắt buộc.")]
        [StringLength(200, ErrorMessage = "Tên nhóm đặc tả không được vượt quá 200 ký tự.")]
        public string GroupName { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Thứ tự hiển thị không hợp lệ.")]
        public int DisplayOrder { get; set; }
        [Required(ErrorMessage = "Mã danh mục là bắt buộc.")]
        public int CategoryId { get; set; }
    }
}
