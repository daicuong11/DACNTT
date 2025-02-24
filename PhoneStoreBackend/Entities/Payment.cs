using PhoneStoreBackend.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Entities
{
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PaymentId { get; set; }

        [Required]
        public string TransactionId { get; set; }

        public int OrderId { get; set; }
        [ForeignKey("OrderId")]
        [JsonIgnore]
        public Order Order { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string PaymentMethod { get; set; } // VnPay, MoMo, COD

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string PaymentStatus { get; set; } = PaymentStatusEnum.Pending.ToString(); // Pending, Completed, Failed

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }

        public DateTime PaymentDate { get; set; } = DateTime.Now;
    }
}
