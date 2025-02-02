using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/product_variants")]
    [ApiController]
    public class ProductVariantController : ControllerBase
    {

        private readonly IProductVariantRepository productVariantRepository;

        public ProductVariantController(IProductVariantRepository productVariantRepository)
        {
            this.productVariantRepository = productVariantRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProductVariant() {
            try
            {
                var productVariants = await productVariantRepository.GetAllAsync();
                var response = Response<ICollection<ProductVariantDTO>>.CreateSuccessResponse(productVariants, "Danh sách sản phẩm: ");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var findProductVariant = await productVariantRepository.GetProductVariantById(id);

                var response = Response<ProductVariantDTO>.CreateSuccessResponse(findProductVariant, "Thông tin sản phẩm: ");
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

        [HttpPost]
        [Authorize(Roles = "ADMIN")]

        public async Task<IActionResult> Add([FromBody] ProductVariantRequest productVariantReq)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createProductVariant = new ProductVariant
                {
                    ProductId = productVariantReq.ProductId,
                    DiscountId = productVariantReq.DiscountId,
                    Slug = productVariantReq.Slug,
                    Color = productVariantReq.Color,
                    Stock = productVariantReq.Stock,
                    Storage = productVariantReq.Storage,
                    Price = productVariantReq.Price,
                };
                var newProductVariant = await productVariantRepository.AddProductVariantAsync(createProductVariant);
                var response = Response<ProductVariantDTO>.CreateSuccessResponse(newProductVariant, "Thêm thành công");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("id")]
        [Authorize(Roles = "ADMIN")]

        public async Task<IActionResult> Update(int id, [FromBody] ProductVariantRequest productVariantReq)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var createProductVariant = new ProductVariant
                {
                    ProductId = productVariantReq.ProductId,
                    DiscountId = productVariantReq.DiscountId,
                    Slug = productVariantReq.Slug,
                    Color = productVariantReq.Color,
                    Stock = productVariantReq.Stock,
                    Storage = productVariantReq.Storage,
                    Price = productVariantReq.Price,
                };
                await productVariantRepository.UpdateProductVariantAsync(id,createProductVariant);
                var response = Response<object>.CreateSuccessResponse(null, "Chỉnh sửa thành công");
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

        [HttpDelete("id")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await productVariantRepository.DeleteProductVariantAsync(id);
                var response = Response<object>.CreateSuccessResponse(null, "Xóa thành công");
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
    }
}
