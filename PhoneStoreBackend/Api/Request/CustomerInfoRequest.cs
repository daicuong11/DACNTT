using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class CustomerInfoRequest
    {
        [Required(ErrorMessage = "Tên khách hàng là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Tên khách hàng không được vượt quá 100 ký tự.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Số điện thoại là bắt buộc.")]
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ.")]
        [StringLength(15, ErrorMessage = "Số điện thoại không được vượt quá 15 ký tự.")]
        public string PhoneNumber { get; set; }

        public string Email { get; set; }
    }
}
