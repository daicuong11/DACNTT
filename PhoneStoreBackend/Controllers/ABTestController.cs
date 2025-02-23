using EFCore.BulkExtensions;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.Data.Seeding;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/a-test")]
    [ApiController]
    public class ABTestController : Controller
    {
        private readonly AppDbContext _context;

        public ABTestController(AppDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost]
        public async Task<IActionResult> SeedData()
        {
            try
            {
                // Nạp dữ liệu từ JSON
                var users = DatabaseSeeder.GetUserFromJson("users.json");
                var brands = DatabaseSeeder.GetDataFromJson<Brand>("brands.json");
                var categories = DatabaseSeeder.GetDataFromJson<Category>("categories.json");
                var products = DatabaseSeeder.GetDataFromJson<Product>("products.json");
                var discounts = DatabaseSeeder.GetDataFromJson<Discount>("discounts.json");
                var productVariants = DatabaseSeeder.GetDataFromJson<ProductVariant>("variants.json");
                var groups = DatabaseSeeder.GetDataFromJson<ProductSpecificationGroup>("groups.json");
                var specifications = DatabaseSeeder.GetDataFromJson<ProductSpecification>("specifications.json");
                var productImages = DatabaseSeeder.GetDataFromJson<ProductImage>("product_images.json");

                // Thêm dữ liệu vào database bằng BulkInsert
                _context.BulkInsert(users);
                _context.BulkInsert(brands);
                _context.BulkInsert(categories);
                _context.BulkInsert(products);
                _context.BulkInsert(discounts);
                _context.BulkInsert(productVariants);
                _context.BulkInsert(groups);
                _context.BulkInsert(specifications);
                _context.BulkInsert(productImages);

                // Lưu thay đổi
                await _context.SaveChangesAsync();

                var response = Response<object>.CreateSuccessResponse(null, "Tạo dữ liệu thành công");
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
