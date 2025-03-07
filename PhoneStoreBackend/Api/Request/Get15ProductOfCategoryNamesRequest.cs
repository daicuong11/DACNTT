using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.Api.Request
{
    public class Get15ProductOfCategoryNamesRequest
    {
        [Required(ErrorMessage = "Cần mảng dữ liệu")]
        public List<string> CategoryNames { get; set; } = new List<string>();
    }
}
