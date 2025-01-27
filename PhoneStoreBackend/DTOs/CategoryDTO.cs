using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.DTOs
{
    public class CategoryDTO
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = "";
        public string ImageUrl { get; set; }
    }
}
