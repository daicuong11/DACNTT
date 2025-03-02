using PhoneStoreBackend.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public string Password { get; set; }
        [Required]
        public string PhoneNumber { get; set; } 

        public string Address { get; set; }

        public string ProfilePicture { get; set; } 

        [Column(TypeName = "nvarchar(20)")]
        [EnumDataType(typeof(RoleEnum))]
        public string Role { get; set; } = RoleEnum.CUSTOMER.ToString(); // Mặc định là USER

        public bool Active { get; set; } = true;

        public bool IsGoogleAccount { get; set; } = false;

        [JsonIgnore]
        public string? RefreshToken { get; set; }
        [JsonIgnore]
        public DateTime? RefreshTokenExpiryTime { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        [JsonIgnore]
        public ICollection<Cart> Carts { get; set; }
        [JsonIgnore]
        public ICollection<Review> Reviews { get; set; }
        [JsonIgnore]
        public ICollection<Order> Orders { get; set; }
        [JsonIgnore]
        public ICollection<Coupon> Coupons { get; set; }
        [JsonIgnore]
        public ICollection<Address> Addresses { get; set; }
        [JsonIgnore]
        public ICollection<Wishlist> Wishlists { get; set; }
        [JsonIgnore]
        public ICollection<Notification> Notifications { get; set; }
        [JsonIgnore]
        public ICollection<Notification> SentNotifications { get; set; }
        [JsonIgnore] 
        public ICollection<Comment> Comments { get; set; }
        [JsonIgnore]
        public ICollection<Reply> Replies { get; set; }
    }
}
