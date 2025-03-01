using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Entities
{
    public class Reply
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReplyId { get; set; }

        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]

        [Required]
        public int CommentId { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [JsonIgnore]
        public Comment Comment { get; set; }
        public User User { get; set; }
    }
}
