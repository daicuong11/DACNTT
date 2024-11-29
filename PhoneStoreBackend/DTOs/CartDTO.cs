namespace PhoneStoreBackend.DTOs
{
    public class CartDTO
    {
        public int CartId { get; set; }
        public int UserId { get; set; }
        public UserDTO User { get; set; }
    }
}
