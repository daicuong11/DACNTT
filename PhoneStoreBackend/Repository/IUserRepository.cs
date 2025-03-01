using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IUserRepository
    {
        // Lấy tất cả người dùng
        Task<ICollection<UserDTO>> GetAllAsync();

        // Lấy người dùng theo ID
        Task<UserDTO> GetUserByIdAsync(int id);

        // Lấy người dùng theo email
        Task<UserDTO> GetUserByEmailAsync(string email);

        // Thêm người dùng mới
        Task<UserDTO> AddUserAsync(User user);

        // Cập nhật tên người dùng
        Task<bool> UpdateUserNameAsync(int id, string newName);

        // Cập nhật email người dùng
        Task<bool> UpdateUserEmailAsync(int id, string newEmail);

        // Cập nhật số điện thoại người dùng
        Task<bool> UpdateUserPhoneNumberAsync(int id, string newPhoneNumber);

        // Xóa người dùng theo ID
        Task<bool> DeleteUserAsync(int id);

        Task<UserDTO> UpdateUserStatusAsync(int id);

    }
}
