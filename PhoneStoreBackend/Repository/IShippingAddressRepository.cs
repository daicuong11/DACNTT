using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IShippingAddressRepository
    {
        Task<ICollection<ShippingAddressDTO>> GetAllShippingAddressesAsync();
        Task<ShippingAddressDTO> GetShippingAddressByIdAsync(int shippingAddressId);
        Task<ICollection<ShippingAddressDTO>> GetShippingAddressesByOrderIdAsync(int orderId);
        Task<ShippingAddressDTO> AddShippingAddressAsync(ShippingAddress shippingAddress);
        Task<bool> UpdateShippingAddressAsync(int shippingAddressId, ShippingAddress shippingAddress);
        Task<bool> DeleteShippingAddressAsync(int shippingAddressId);
    }
}
