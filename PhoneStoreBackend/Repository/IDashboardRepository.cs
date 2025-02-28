using PhoneStoreBackend.DTOs;

namespace PhoneStoreBackend.Repository
{
    public interface IDashboardRepository
    {
        Task<int> TotalSales();
        Task<int> TotalRevenue();
        Task<int> TotalUsers();
        Task<int> TotalProfit();
        Task<int> TotalProducts();
        Task<int> TotalOrders();

        Task<List<OrderStatisticsDto>> GetOrdersStatistics(string type);
    }
}
