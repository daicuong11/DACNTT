using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository.Implements
{
    public class CustomerService : ICustomerRepository
    {
        private readonly AppDbContext _context;
        public CustomerService(AppDbContext context) { 
            _context = context;
        }
        public async Task<Customer> AddAsync(Customer customer)
        {
            var entite = await _context.AddAsync(customer);
            await _context.SaveChangesAsync();
            return entite.Entity;
        }

        public async Task<ICollection<Customer>> GetAllAsync()
        {
            return await _context.Customers.ToListAsync();
        }

        public async Task<Customer> GetByIdAsync(int id)
        {
            var c = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);
            if (c == null)
            {
                throw new KeyNotFoundException("Không tìm thấy khách hàng với id");
            }
            return c;
        }
    }
}
