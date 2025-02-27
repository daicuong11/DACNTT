using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class DashboardController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IDashboardRepository _dashboardRepository;

        public DashboardController(IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }

        [HttpGet("total-orders")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetTotalOrders()
        {
            try
            {
                var total = await _dashboardRepository.TotalOrders();
                var response = Response<int>.CreateSuccessResponse(total, "Tổng đơn hàng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("total-users")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                int total = await _dashboardRepository.TotalUsers();
                var response = Response<int>.CreateSuccessResponse(total, "Tổng người dùng");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }
        [HttpGet("total-revenue")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetTotalRevenue()
        {
            try
            {
                var total = await _dashboardRepository.TotalRevenue();

                var response = Response<decimal>.CreateSuccessResponse(total, "Tổng doanh thu");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }
        [HttpGet("total-sales")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetTotalSales()
        {
            try
            {
                int total = await _dashboardRepository.TotalSales();

                var response = Response<int>.CreateSuccessResponse(total, "Tổng số sản phẩm đã bán");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("total-products")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetTotalProducts()
        {
            try
            {
                int total = await _dashboardRepository.TotalProducts();

                var response = Response<int>.CreateSuccessResponse(total, "Tổng số sản phẩm trong kho");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("orders-statistics")]
        public async Task<IActionResult> GetOrdersStatistics()
        {

            try
            {
                var data = await _dashboardRepository.GetOrdersStatistics();

                var response = Response<ICollection<OrderStatisticsDto>>.CreateSuccessResponse(data, "Thống kê đơn hàng theo năm");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

    }
}
