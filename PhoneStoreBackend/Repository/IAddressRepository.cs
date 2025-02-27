using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IAddressRepository
    {
        Task<ICollection<AddressDTO>> GetAllByUserIdAsync(int userId);
        Task<AddressDTO> GetAddressByIdAsync(int addressId);
        Task<AddressDTO> AddAddressAsync(Address address);
        Task<bool> UpdateAddressAsync(int addressId, Address address);
        Task<bool> DeleteAddressAsync(int addressId);

        Task<bool> SetToDefaultAddress(int addressId);
    }
}
