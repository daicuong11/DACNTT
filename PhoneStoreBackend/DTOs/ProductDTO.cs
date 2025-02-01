using PhoneStoreBackend.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.DTOs
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public int BrandId { get; set; }
        public Brand Brand { get; set; }
    }
}
