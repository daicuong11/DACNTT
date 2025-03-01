using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneStoreBackend.Entities
{
    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CommentId { get; set; }

        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]

        [Required]
        public int ProductVariantId { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public User User { get; set; }
        public ProductVariant ProductVariant { get; set; }
        public ICollection<Reply> Replies { get; set; }

    }
}
