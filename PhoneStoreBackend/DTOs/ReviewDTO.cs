using PhoneStoreBackend.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.DTOs
{
    public class ReviewDTO
    {
        public int ReviewId { get; set; }

        public int ProductVariantId { get; set; }

        public int UserId { get; set; }

        public int Rating { get; set; }

        public string? Comment { get; set; }

        public bool HasImages { get; set; } = false;

        public string? Images { get; set; } 

        public bool VerifiedPurchase { get; set; } = false;

        public bool IsReply { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
    }
}
