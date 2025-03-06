namespace PhoneStoreBackend.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text.Json.Serialization;

    public class Review
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReviewId { get; set; }

        [Required]
        public int ProductVariantId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Range(1, 5, ErrorMessage = "Rating phải từ 1 đến 5 sao.")]
        public int Rating { get; set; }

        [MaxLength(1000, ErrorMessage = "Nội dung đánh giá không được vượt quá 1000 ký tự.")]
        public string? Comment { get; set; }

        public bool HasImages { get; set; } = false;

        public string? Images { get; set; } // Lưu danh sách ảnh dạng JSON hoặc URL ngăn cách bởi dấu ','

        public bool VerifiedPurchase { get; set; } = false;

        public bool IsReply { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [ForeignKey("ProductVariantId")]
        [JsonIgnore]
        public ProductVariant ProductVariant { get; set; }
    }

}
