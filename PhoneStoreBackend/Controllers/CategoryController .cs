using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await _categoryRepository.GetAllAsync();
                var response = Response<ICollection<CategoryDTO>>.CreateSuccessResponse(categories, "Danh sách danh mục");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            try
            {
                var category = await _categoryRepository.GetByIdAsync(id);
                if (category == null)
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy danh mục");
                    return NotFound(errorResponse);
                }
                var response = Response<CategoryDTO>.CreateSuccessResponse(category, "Thông tin danh mục");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> AddCategory([FromBody] Category category)
        {
            try
            {
                var newCategory = await _categoryRepository.AddAsync(category);
                var response = Response<CategoryDTO>.CreateSuccessResponse(newCategory, "Danh mục đã được tạo");
                return CreatedAtAction(nameof(GetCategoryById), new { id = newCategory.CategoryId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] Category category)
        {
            try
            {
                var updatedCategory = await _categoryRepository.UpdateAsync(id, category);
                if (updatedCategory == null)
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy danh mục để cập nhật");
                    return NotFound(errorResponse);
                }
                var response = Response<CategoryDTO>.CreateSuccessResponse(updatedCategory, "Danh mục đã được cập nhật");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var result = await _categoryRepository.DeleteAsync(id);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Danh mục đã bị xóa");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy danh mục để xóa");
                    return NotFound(errorResponse);
                }
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }
    }
}
