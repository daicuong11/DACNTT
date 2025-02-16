using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class AddProductImageRequest
    {
        [Required(ErrorMessage = "Hình ảnh là bắt buộc.")]
        public string ImageUrl { get; set; }

        [Required(ErrorMessage = "Trường chính của hình ảnh là bắt buộc.")]
        public bool IsMain { get; set; } = false;
    }
}
