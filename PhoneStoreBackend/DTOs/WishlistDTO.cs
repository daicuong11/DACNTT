namespace PhoneStoreBackend.DTOs
{
    public class WishlistDTO
    {
        public int WishlistId { get; set; }
        public int UserId { get; set; }
        public ICollection<WishlistItemDTO> WishlistItems { get; set; }
    }
}
