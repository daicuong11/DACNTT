using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class ProductSpecificationGroupRequest
    {
        [Required(ErrorMessage = "Tên nhóm đặc tả là bắt buộc.")]
        [StringLength(200, ErrorMessage = "Tên nhóm đặc tả không được vượt quá 200 ký tự.")]
        public string GroupName { get; set; }

        [StringLength(1000, ErrorMessage = "Mô tả nhóm đặc tả không được vượt quá 1000 ký tự.")]
        public string Description { get; set; }
    }
}
