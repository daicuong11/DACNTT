using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneStoreBackend.Entities
{
    public class ActivityLog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LogId { get; set; }

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        [Required]
        [StringLength(200)]
        public string Action { get; set; } // Example: "Login", "OrderCreated", "ProductViewed"

        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
