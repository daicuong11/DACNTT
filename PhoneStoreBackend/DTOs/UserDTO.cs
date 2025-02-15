using PhoneStoreBackend.Enums;

namespace PhoneStoreBackend.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
        public bool Active { get; set; }
        public string ProfilePicture { get; set; }
        public bool IsGoogleAccount { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
