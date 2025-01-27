using PhoneStoreBackend.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PhoneStoreBackend.DTOs
{
    public class ReviewDTO
    {
        public int ReviewId { get; set; }

        public int ProductVariantID { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int Rating { get; set; } 

        public string? Comment { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
