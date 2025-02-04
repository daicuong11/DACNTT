using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;
using PhoneStoreBackend.Repository.Implements;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/brands")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository _brandRepository;
        private readonly CloudinaryService _cloudinaryService;

        public BrandController(IBrandRepository brandRepository, CloudinaryService cloudinaryService)
        {
            _brandRepository = brandRepository;
            _cloudinaryService = cloudinaryService;
        }

        [HttpGet]
        //[Authorize(Roles = "ADMIN")]
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
        //[Authorize] 
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
        //[Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> AddBrand([FromForm] BrandRequest brand)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                string imageUrl = null;

                if (brand.Image != null)
                {
                    imageUrl = await _cloudinaryService.UploadImageAsync(brand.Image, "Brands");
                }

                var createBrand = new Brand
                {
                    Name = brand.Name,
                    Description = brand.Description,
                    ImageUrl = imageUrl,
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
        //[Authorize(Roles = "ADMIN")]  
        public async Task<IActionResult> UpdateBrand(int brandId, [FromForm] BrandRequest brand)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                string imageUrl = null;

                if (brand.Image != null)
                {
                    imageUrl = await _cloudinaryService.UploadImageAsync(brand.Image, "Brands");
                }

                var createBrand = new Brand
                {
                    Name = brand.Name,
                    Description = brand.Description,
                    ImageUrl = imageUrl,
                };

                var result = await _brandRepository.UpdateBrandAsync(brandId, createBrand);
                if (result)
                {
                    createBrand.BrandId = brandId;
                    var response = Response<object>.CreateSuccessResponse(createBrand, "Thương hiệu đã được cập nhật");
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
        //[Authorize(Roles = "ADMIN")] 
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
