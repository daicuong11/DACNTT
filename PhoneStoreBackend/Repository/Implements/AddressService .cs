using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class AddressService : IAddressRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public AddressService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả địa chỉ của người dùng
        public async Task<ICollection<AddressDTO>> GetAllByUserIdAsync(int userId)
        {
            var addresses = await _context.Addresses
                                          .Where(a => a.UserId == userId)
                                          .ToListAsync();
            return addresses.Select(a => _mapper.Map<AddressDTO>(a)).ToList();
        }

        // Lấy địa chỉ theo AddressId
        public async Task<AddressDTO> GetAddressByIdAsync(int addressId)
        {
            var address = await _context.Addresses
                                         .FirstOrDefaultAsync(a => a.AddressId == addressId);
            if (address == null)
            {
                throw new KeyNotFoundException("Address not found.");
            }

            return _mapper.Map<AddressDTO>(address);
        }

        // Thêm địa chỉ mới
        public async Task<AddressDTO> AddAddressAsync(Address address)
        {
            bool hasAnyAddress = await _context.Addresses.AnyAsync(a => a.UserId == address.UserId);

            if (!hasAnyAddress)
            {
                address.IsDefault = true;
            }

            var newAddress = await _context.Addresses.AddAsync(address);
            await _context.SaveChangesAsync();

            return _mapper.Map<AddressDTO>(newAddress.Entity);
        }


        public async Task<bool> UpdateAddressAsync(int addressId, Address address)
        {
            var existingAddress = await _context.Addresses.FindAsync(addressId);
            if (existingAddress == null)
            {
                throw new KeyNotFoundException("Address not found.");
            }

            existingAddress.Street = address.Street;
            existingAddress.Province = address.Province;
            existingAddress.Ward = address.Ward;
            existingAddress.District = address.District;

            if (address.IsDefault)
            {
                var otherAddresses = await _context.Addresses
                    .Where(a => a.UserId == existingAddress.UserId && a.AddressId != addressId)
                    .ToListAsync();

                foreach (var addr in otherAddresses)
                {
                    addr.IsDefault = false;
                }
            }

            existingAddress.IsDefault = address.IsDefault;

            await _context.SaveChangesAsync();
            return true;
        }

        // Xóa địa chỉ
        public async Task<bool> DeleteAddressAsync(int addressId)
        {
            var address = await _context.Addresses.FindAsync(addressId);
            if (address == null)
            {
                throw new KeyNotFoundException("Address not found.");
            }

            _context.Addresses.Remove(address);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> SetToDefaultAddress(int addressId)
        {
            var address = await _context.Addresses.FindAsync(addressId);
            if (address == null)
            {
                return false; 
            }

            var userAddresses = await _context.Addresses
                .Where(a => a.UserId == address.UserId)
                .ToListAsync();

            foreach (var addr in userAddresses)
            {
                addr.IsDefault = false;
            }

            address.IsDefault = true;

            await _context.SaveChangesAsync();

            return true;
        }

    }
}
