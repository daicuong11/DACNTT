using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var products = await _productRepository.GetAllAsync();
                var response = Response<ICollection<ProductDTO>>.CreateSuccessResponse(products, "Danh sách tất cả sản phẩm");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            try
            {
                var product = await _productRepository.GetProductByIdAsync(id);

                var response = Response<ProductDTO>.CreateSuccessResponse(product, "Thông tin sản phẩm");
                return Ok(response);
            }
            catch (KeyNotFoundException)
            {
                var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy sản phẩm với id= " + id);
                return NotFound(notFoundResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{productId}/variants")]
        public async Task<IActionResult> GetProductVariants(int productId)
        {
            try
            {
                var variants = await _productRepository.GetProductVariantsAsync(productId);
                var response = Response<ICollection<ProductVariantDTO>>.CreateSuccessResponse(variants, $"Danh sách biến thể của productId: {productId}");
                return Ok(variants);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost]
        //[Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> AddProduct([FromBody] ProductRequest product)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createProduct = new Product
                {
                    Name = product.Name,
                    Description = product.Description,
                    CategoryId = product.CategoryId,
                    BrandId = product.BrandId,
                };
                var createdProduct = await _productRepository.AddProductAsync(createProduct);
                var response = Response<ProductDTO>.CreateSuccessResponse(createdProduct, "Sản phẩm đã được thêm thành công");
                return CreatedAtAction(nameof(GetProductById), new { id = createdProduct.ProductId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        //[Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductRequest product)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var updatedProduct = new Product
                {
                    Name = product.Name,
                    Description = product.Description,
                    CategoryId = product.CategoryId,
                    BrandId = product.BrandId,
                };
                var isUpdated = await _productRepository.UpdateProductAsync(id, updatedProduct);

                var response = Response<object>.CreateSuccessResponse(null, "Sản phẩm đã được cập nhật thành công");
                return Ok(response);
            }
            catch (KeyNotFoundException)
            {
                var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy sản phẩm để cập nhật.");
                return NotFound(notFoundResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                var isDeleted = await _productRepository.DeleteProductAsync(id);

                var response = Response<object>.CreateSuccessResponse(null, "Sản phẩm đã được xóa thành công");
                return Ok(response);
            }
            catch (KeyNotFoundException)
            {
                var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy sản phẩm để xóa.");
                return NotFound(notFoundResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchProducts([FromQuery] string keyword)
        {
            try
            {
                var products = await _productRepository.SearchProductsAsync(keyword);
                var response = Response<ICollection<ProductDTO>>.CreateSuccessResponse(products, "Kết quả tìm kiếm sản phẩm");
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
