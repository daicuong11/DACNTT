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
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }

        public string PhoneNumber { get; set; } 

        public string Address { get; set; }

        public string ProfilePicture { get; set; } 

        [Column(TypeName = "nvarchar(20)")]
        [EnumDataType(typeof(RoleEnum))]
        public string Role { get; set; } = RoleEnum.CUSTOMER.ToString(); // Mặc định là USER

        public bool Active { get; set; } = true;

        public bool IsGoogleAccount { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public ICollection<Cart> Carts { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Coupon> Coupons { get; set; }
        public ICollection<Address> Addresses { get; set; }
        public ICollection<Wishlist> Wishlists { get; set; }
        public ICollection<Notification> Notifications { get; set; } 
        public ICollection<Notification> SentNotifications { get; set; } 
    }
}
