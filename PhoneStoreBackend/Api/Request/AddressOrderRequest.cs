using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class AddressOrderRequest
    {
        [Required(ErrorMessage = "Vui lòng nhập đường/phố.")]
        [StringLength(500, ErrorMessage = "Đường/phố không được vượt quá 255 ký tự.")]
        public string Street { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập phường/xã.")]
        [StringLength(100, ErrorMessage = "Phường/xã không được vượt quá 100 ký tự.")]
        public string Ward { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập quận/huyện.")]
        [StringLength(100, ErrorMessage = "Quận/huyện không được vượt quá 100 ký tự.")]
        public string District { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập tỉnh/thành phố.")]
        [StringLength(100, ErrorMessage = "Tỉnh/thành phố không được vượt quá 100 ký tự.")]
        public string Province { get; set; }
    }
}
