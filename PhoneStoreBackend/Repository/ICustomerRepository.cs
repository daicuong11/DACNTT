using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface ICustomerRepository
    {
        Task<ICollection<Customer>> GetAllAsync();
        Task<Customer> GetByIdAsync(int id);
        Task<Customer> AddAsync(Customer customer);
    }
}
