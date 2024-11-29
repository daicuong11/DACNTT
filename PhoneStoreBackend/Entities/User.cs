using PhoneStoreBackend.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneStoreBackend.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 5)]
        public string? Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [StringLength(100, MinimumLength = 6)]
        public string? Password { get; set; }

        public string? NumberPhone { get; set; } 

        public string? Address { get; set; }

        public string? ProfilePicture { get; set; } // Không bắt buộc

        [Column(TypeName = "nvarchar(20)")]
        [EnumDataType(typeof(RoleEnum))]
        public string Role { get; set; } = RoleEnum.CUSTOMER.ToString(); // Mặc định là USER

        public bool Active { get; set; } = true;

        public bool IsGoogleAccount { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

    }
}
