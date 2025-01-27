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
        public string Province { get; set; }

        [Required]
        [StringLength(200)]
        public string District { get; set; }

        [Required]
        [StringLength(200)]
        public string Ward { get; set; }

        [Required]
        public string Street { get; set; }

        public bool IsDefault { get; set; } = false;
    }
}
