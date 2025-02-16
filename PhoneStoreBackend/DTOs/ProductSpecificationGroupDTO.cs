using PhoneStoreBackend.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.DTOs
{
    public class ProductSpecificationGroupDTO
    {
        public int ProductSpecificationGroupId { get; set; }

        public string GroupName { get; set; }

        public int DisplayOrder { get; set; }

        public int CategoryId { get; set; }
        public ICollection<ProductSpecificationDTO> ProductSpecifications { get; set; }

    }
}
