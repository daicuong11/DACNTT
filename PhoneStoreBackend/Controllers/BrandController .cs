using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/brands")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository _brandRepository;

        public BrandController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAllBrands()
        {
            try
            {
                var brands = await _brandRepository.GetAllAsync();
                var response = Response<ICollection<BrandDTO>>.CreateSuccessResponse(brands, "Danh sách thương hiệu");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{brandId}")]
        [Authorize] 
        public async Task<IActionResult> GetBrandById(int brandId)
        {
            try
            {
                var brand = await _brandRepository.GetBrandByIdAsync(brandId);
                if (brand == null)
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy thương hiệu");
                    return NotFound(errorResponse);
                }
                var response = Response<BrandDTO>.CreateSuccessResponse(brand, "Thông tin thương hiệu");
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
        public async Task<IActionResult> AddBrand([FromBody] BrandRequest brand)
        {
            try
            {
                var createBrand = new Brand
                {
                    Name = brand.Name,
                    Description = brand.Description,
                    ImageUrl = brand.ImageUrl,
                };
                var newBrand = await _brandRepository.AddBrandAsync(createBrand);
                var response = Response<BrandDTO>.CreateSuccessResponse(newBrand, "Thương hiệu đã được tạo thành công");
                return CreatedAtAction(nameof(GetBrandById), new { brandId = newBrand.BrandId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{brandId}")]
        [Authorize(Roles = "ADMIN")]  
        public async Task<IActionResult> UpdateBrand(int brandId, [FromBody] BrandRequest brand)
        {
            try
            {
                var updateBrand = new Brand
                {
                    Name = brand.Name,
                    Description = brand.Description,
                    ImageUrl = brand.ImageUrl,
                };
                var result = await _brandRepository.UpdateBrandAsync(brandId, updateBrand);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Thương hiệu đã được cập nhật");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy thương hiệu");
                    return NotFound(errorResponse);
                }
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpDelete("{brandId}")]
        [Authorize(Roles = "ADMIN")] 
        public async Task<IActionResult> DeleteBrand(int brandId)
        {
            try
            {
                var result = await _brandRepository.DeleteBrandAsync(brandId);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Thương hiệu đã bị xóa");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy thương hiệu");
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
