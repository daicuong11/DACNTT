using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class ShippingAddressService : IShippingAddressRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ShippingAddressService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả địa chỉ giao hàng
        public async Task<ICollection<ShippingAddressDTO>> GetAllShippingAddressesAsync()
        {
            var shippingAddresses = await _context.ShippingAddresses.ToListAsync();
            return shippingAddresses.Select(sa => _mapper.Map<ShippingAddressDTO>(sa)).ToList();
        }

        // Lấy địa chỉ giao hàng theo ShippingAddressId
        public async Task<ShippingAddressDTO> GetShippingAddressByIdAsync(int shippingAddressId)
        {
            var shippingAddress = await _context.ShippingAddresses.FirstOrDefaultAsync(sa => sa.ShippingAddressId == shippingAddressId);
            if (shippingAddress == null)
            {
                throw new Exception("Shipping address not found.");
            }
            return _mapper.Map<ShippingAddressDTO>(shippingAddress);
        }

        // Lấy các địa chỉ giao hàng theo OrderId
        public async Task<ICollection<ShippingAddressDTO>> GetShippingAddressesByOrderIdAsync(int orderId)
        {
            var shippingAddresses = await _context.ShippingAddresses.Where(sa => sa.OrderId == orderId).ToListAsync();
            return shippingAddresses.Select(sa => _mapper.Map<ShippingAddressDTO>(sa)).ToList();
        }

        // Thêm địa chỉ giao hàng
        public async Task<ShippingAddressDTO> AddShippingAddressAsync(ShippingAddress shippingAddress)
        {
            var newShippingAddress = await _context.ShippingAddresses.AddAsync(shippingAddress);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShippingAddressDTO>(newShippingAddress.Entity);
        }

        // Cập nhật địa chỉ giao hàng
        public async Task<bool> UpdateShippingAddressAsync(int shippingAddressId, ShippingAddress shippingAddress)
        {
            var existingShippingAddress = await _context.ShippingAddresses.FindAsync(shippingAddressId);
            if (existingShippingAddress == null)
            {
                throw new Exception("Shipping address not found.");
            }

            existingShippingAddress.Address = shippingAddress.Address;
            existingShippingAddress.City = shippingAddress.City;
            existingShippingAddress.State = shippingAddress.State;
            existingShippingAddress.PostalCode = shippingAddress.PostalCode;
            existingShippingAddress.Country = shippingAddress.Country;
            existingShippingAddress.IsDefault = shippingAddress.IsDefault;

            _context.ShippingAddresses.Update(existingShippingAddress);
            await _context.SaveChangesAsync();

            return true;
        }

        // Xóa địa chỉ giao hàng
        public async Task<bool> DeleteShippingAddressAsync(int shippingAddressId)
        {
            var shippingAddress = await _context.ShippingAddresses.FindAsync(shippingAddressId);
            if (shippingAddress == null)
            {
                throw new Exception("Shipping address not found.");
            }

            _context.ShippingAddresses.Remove(shippingAddress);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
