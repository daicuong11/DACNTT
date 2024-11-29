using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneStoreBackend.Entities
{
    public class Address
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AddressId { get; set; }

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        [Required]
        [StringLength(200)]
        public string Street { get; set; }

        [Required]
        [StringLength(100)]
        public string City { get; set; }

        [Required]
        [StringLength(100)]
        public string State { get; set; }

        [Required]
        [StringLength(20)]
        public string PostalCode { get; set; }

        [Required]
        [StringLength(50)]
        public string Country { get; set; }

        public bool IsDefault { get; set; } = false;

        [Required]
        [Column(TypeName = "nvarchar(20)")]
        public string AddressType { get; set; } // Shipping, Billing
    }
}
