using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/product-images")]
    [ApiController]
    public class ProductImageController : ControllerBase
    {
        private readonly IProductImageRepository _productImageRepository;

        public ProductImageController(IProductImageRepository productImageRepository)
        {
            _productImageRepository = productImageRepository;
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAllProductImages()
        {
            try
            {
                var images = await _productImageRepository.GetAllProductImagesAsync();
                var response = Response<ICollection<ProductImageDTO>>.CreateSuccessResponse(images, "Danh sách tất cả hình ảnh sản phẩm");
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
        public async Task<IActionResult> GetProductImageById(int id)
        {
            try
            {
                var image = await _productImageRepository.GetProductImageByIdAsync(id);
                if (image == null)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy hình ảnh sản phẩm.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<ProductImageDTO>.CreateSuccessResponse(image, "Thông tin hình ảnh sản phẩm");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("product/{productId}")]
        [Authorize]
        public async Task<IActionResult> GetProductImagesByProductId(int productId)
        {
            try
            {
                var images = await _productImageRepository.GetProductImagesByProductIdAsync(productId);
                var response = Response<ICollection<ProductImageDTO>>.CreateSuccessResponse(images, "Danh sách hình ảnh theo sản phẩm");
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
        public async Task<IActionResult> AddProductImage([FromBody] ProductImageDTO imageDto)
        {
            try
            {
                var productImage = new ProductImage
                {
                    ProductId = imageDto.ProductId,
                    ImageUrl = imageDto.ImageUrl
                };

                var createdImage = await _productImageRepository.AddProductImageAsync(productImage);
                var response = Response<ProductImageDTO>.CreateSuccessResponse(createdImage, "Hình ảnh sản phẩm đã được thêm thành công");
                return CreatedAtAction(nameof(GetProductImageById), new { id = createdImage.ImageId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateProductImage(int id, [FromBody] ProductImageDTO imageDto)
        {
            try
            {
                var productImage = new ProductImage
                {
                    ProductId = imageDto.ProductId,
                    ImageUrl = imageDto.ImageUrl
                };

                var isUpdated = await _productImageRepository.UpdateProductImageAsync(id, productImage);
                if (!isUpdated)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy hình ảnh sản phẩm để cập nhật.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Hình ảnh sản phẩm đã được cập nhật thành công");
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
        public async Task<IActionResult> DeleteProductImage(int id)
        {
            try
            {
                var isDeleted = await _productImageRepository.DeleteProductImageAsync(id);
                if (!isDeleted)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy hình ảnh sản phẩm để xóa.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Hình ảnh sản phẩm đã được xóa thành công");
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
