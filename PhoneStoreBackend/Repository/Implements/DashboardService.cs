
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Enums;
using System.Globalization;

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

        public async Task<List<OrderStatisticsDto>> GetOrdersStatistics(string type)
        {
            DateTime now = DateTime.UtcNow;

            if (type == "day")
            {
                // Lấy dữ liệu 30 ngày gần nhất
                var last30Days = Enumerable.Range(0, 30)
                    .Select(i => now.Date.AddDays(-i))
                    .Select(date => (date.Year, date.Month, date.Day))
                    .ToList();

                var orders = await _context.Orders
                    .Where(o => o.OrderDate >= now.AddDays(-29).Date)
                    .GroupBy(o => new { o.OrderDate.Year, o.OrderDate.Month, o.OrderDate.Day })
                    .Select(g => new OrderStatisticsDto
                    {
                        Year = g.Key.Year,
                        Month = g.Key.Month,
                        Day = g.Key.Day,
                        TotalOrders = g.Count(),
                        TotalRevenue = g.Sum(o => o.TotalAmount)
                    })
                    .ToListAsync();

                var result = last30Days
                    .GroupJoin(orders,
                        date => (date.Year, date.Month, date.Day),
                        order => (order.Year, order.Month, order.Day),
                        (date, orderGroup) => new OrderStatisticsDto
                        {
                            Year = date.Year,
                            Month = date.Month,
                            Day = date.Day,
                            TotalOrders = orderGroup.FirstOrDefault()?.TotalOrders ?? 0,
                            TotalRevenue = orderGroup.FirstOrDefault()?.TotalRevenue ?? 0
                        })
                    .OrderBy(o => o.Year).ThenBy(o => o.Month).ThenBy(o => o.Day)
                    .ToList();

                return result;
            }
            else if (type == "week")
            {
                var calendar = CultureInfo.InvariantCulture.Calendar;

                // Lấy danh sách 12 tuần gần nhất, sử dụng chuẩn ISO-8601
                var last12Weeks = Enumerable.Range(0, 12)
                    .Select(i =>
                    {
                        var startOfWeek = now.Date.AddDays(-((int)now.DayOfWeek) - (i * 7) + 1); // Bắt đầu từ thứ Hai
                        return new
                        {
                            Year = startOfWeek.Year,
                            WeekNumber = calendar.GetWeekOfYear(startOfWeek, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday), // ISO-8601
                            StartOfWeek = startOfWeek
                        };
                    })
                    .OrderBy(x => x.Year).ThenBy(x => x.WeekNumber)
                    .ToList();

                // Lấy ngày bắt đầu của tuần sớm nhất trong danh sách last12Weeks
                DateTime firstWeekStart = last12Weeks.Min(x => x.StartOfWeek);

                // Truy vấn đơn hàng theo khoảng thời gian từ firstWeekStart trở đi
                var orders = await _context.Orders
                    .Where(o => o.OrderDate >= firstWeekStart)
                    .ToListAsync(); // Lấy toàn bộ dữ liệu trước khi xử lý tại C#

                // Nhóm đơn hàng theo tuần và tính tổng số lượng + tổng doanh thu
                var groupedOrders = orders
                    .GroupBy(o =>
                    {
                        var startOfWeek = o.OrderDate.Date.AddDays(-(int)o.OrderDate.DayOfWeek + 1); // Bắt đầu từ thứ Hai
                        return new
                        {
                            Year = startOfWeek.Year,
                            WeekNumber = calendar.GetWeekOfYear(startOfWeek, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday) // ISO-8601
                        };
                    })
                    .Select(g => new OrderStatisticsDto
                    {
                        Year = g.Key.Year,
                        Week = g.Key.WeekNumber,
                        TotalOrders = g.Count(),
                        TotalRevenue = g.Sum(o => o.TotalAmount)
                    })
                    .ToList();

                // Ghép dữ liệu tuần với dữ liệu đơn hàng
                var result = last12Weeks
                    .GroupJoin(
                        groupedOrders,
                        week => (week.WeekNumber, week.Year),
                        order => (order.Week ?? 0, order.Year), // Xử lý nullable
                        (week, orderGroup) => new OrderStatisticsDto
                        {
                            Year = week.Year,
                            Week = week.WeekNumber,
                            TotalOrders = orderGroup.FirstOrDefault()?.TotalOrders ?? 0,
                            TotalRevenue = orderGroup.FirstOrDefault()?.TotalRevenue ?? 0
                        }
                    )
                    .OrderBy(o => o.Year).ThenBy(o => o.Week)
                    .ToList();

                return result;
            }
            else // Mặc định là thống kê theo tháng
            {
                var last12Months = Enumerable.Range(0, 12)
                    .Select(i => now.AddMonths(-i))
                    .Select(date => (date.Year, date.Month))
                    .ToList();

                var orders = await _context.Orders
                    .Where(o => o.OrderDate >= now.AddMonths(-11).Date)
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
                        date => (date.Year, date.Month),
                        order => (order.Year, order.Month),
                        (date, orderGroup) => new OrderStatisticsDto
                        {
                            Year = date.Year,
                            Month = date.Month,
                            TotalOrders = orderGroup.FirstOrDefault()?.TotalOrders ?? 0,
                            TotalRevenue = orderGroup.FirstOrDefault()?.TotalRevenue ?? 0
                        })
                    .OrderBy(o => o.Year).ThenBy(o => o.Month)
                    .ToList();

                return result;
            }
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
