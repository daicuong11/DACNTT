using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.DTOs
{
    public class CommentDTO
    {
        public int CommentId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public User User { get; set; }
        public ProductVariant ProductVariant { get; set; }
        public ICollection<Reply> Replies { get; set; }

    }
}
