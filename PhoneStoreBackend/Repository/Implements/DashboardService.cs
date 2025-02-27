
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Enums;

namespace PhoneStoreBackend.Repository.Implements
{
    public class DashboardService : IDashboardRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public DashboardService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<OrderStatisticsDto>> GetOrdersStatistics()
        {
            var last12Months = Enumerable.Range(0, 12)
            .Select(i => DateTime.UtcNow.AddMonths(-i))
            .Select(date => new { Year = date.Year, Month = date.Month })
            .ToList();

            var orders = await _context.Orders
                .Where(o => o.OrderDate >= DateTime.UtcNow.AddMonths(-11).Date)
                .GroupBy(o => new { o.OrderDate.Year, o.OrderDate.Month })
                .Select(g => new OrderStatisticsDto
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    TotalOrders = g.Count(),
                    TotalRevenue = g.Sum(o => o.TotalAmount)
                })
                .ToListAsync();

            var result = last12Months
                .GroupJoin(orders,
                    date => new { date.Year, date.Month },
                    order => new { order.Year, order.Month },
                    (date, order) => new OrderStatisticsDto
                    {
                        Year = date.Year,
                        Month = date.Month,
                        TotalOrders = order.FirstOrDefault()?.TotalOrders ?? 0,
                        TotalRevenue = order.FirstOrDefault()?.TotalRevenue ?? 0
                    })
                .OrderBy(o => o.Year).ThenBy(o => o.Month)
                .ToList();

            return result;
        }

        public async Task<int> TotalOrders()
        {
            int total = await _context.Orders.CountAsync();
            return total;
        }

        public async Task<int> TotalProducts()
        {
            int count = await _context.ProductVariants.Where(p => p.Stock > 0).CountAsync();

            return count;
        }

        public Task<int> TotalProfit()
        {
            throw new NotImplementedException();
        }

        public async Task<int> TotalRevenue()
        {
            int totalRevenue = Convert.ToInt32(await _context.Orders
                .Where(o => o.Status == OrderStatusEnum.delivered.ToString())
                .SumAsync(o => o.TotalAmount));

            return totalRevenue;
        }


        public async Task<int> TotalSales()
        {
            // Tính tổng số sản phẩm đã bán từ các đơn hàng đã giao thành công
            int totalSales = await _context.Orders
                .Where(o => o.Status.ToLower() == OrderStatusEnum.delivered.ToString().ToLower())
                .SelectMany(o => o.OrderDetails) // Trả danh sách OrderDetails thành một danh sách duy nhất
                .SumAsync(od => od.Quantity); // Tính tổng Quantity từ tất cả OrderDetails
            return totalSales;
        }

        public async Task<int> TotalUsers()
        {
            int total = await _context.Users.CountAsync();
            return total;
        }
    }
}
