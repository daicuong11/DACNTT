using PhoneStoreBackend.Entities;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.DTOs
{
    public class CustomerDTO
    {
        public int CustomerId { get; set; }

        public string Name { get; set; }

        public string PhoneNumber { get; set; }

        public User User { get; set; }
    }
}
