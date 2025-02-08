using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;
using PhoneStoreBackend.Repository.Implements;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        private readonly IProductRepository _productRepository;
        private readonly IDiscountRepository _discountRepository;
        private readonly IProductVariantRepository _productVariantRepository;
        private readonly IProductSpecificationRepository _productSpecificationRepository;
        private readonly IProductImageRepository _productImageRepository;
        private readonly CloudinaryService _cloudinaryService;
        public ProductController(
        AppDbContext dbContext,
        IProductRepository productRepository,
        IDiscountRepository discountRepository,
        IProductVariantRepository productVariantRepository,
        IProductSpecificationRepository productSpecificationRepository,
        IProductImageRepository productImageRepository,
        CloudinaryService cloudinaryService)
        {
            _dbContext = dbContext;
            _productRepository = productRepository;
            _discountRepository = discountRepository;
            _productVariantRepository = productVariantRepository;
            _productSpecificationRepository = productSpecificationRepository;
            _productImageRepository = productImageRepository;
            _cloudinaryService = cloudinaryService;
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

        [HttpPost("add-with-variants")]
        public async Task<IActionResult> QuickAddProduct([FromBody] AddProductRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using var transaction = await _dbContext.Database.BeginTransactionAsync(); // Mở transaction
            try
            {
                Product newProduct = new Product
                {
                    Name = model.Product.Name,
                    Description = model.Product.Description,
                    CategoryId = model.Product.CategoryId,
                    BrandId = model.Product.BrandId,
                };
                ProductDTO productDTO = await _productRepository.AddProductAsync(newProduct);

                foreach (AddProductVariantRequest variant in model.ProductVariants)
                {
                    // Kiểm tra slug đã tồn tại chưa
                    bool isSlugExists = await _productVariantRepository.AnySlugExistsAsync(variant.Slug);
                    if (isSlugExists)
                    {
                        return BadRequest($"Slug '{variant.Slug}' đã tồn tại.");
                    }

                    ProductVariant newVariant = new ProductVariant
                    {

                        VariantName = variant.VariantName,
                        ProductId = productDTO.ProductId,
                        Slug = variant.Slug,
                        Color = variant.Color,
                        Storage = variant.Storage,
                        Price = variant.Price,
                        ImportPrice = variant.ImportPrice,
                        Stock = variant.Stock,
                        DiscountId = model.DiscountId,
                    };

                    ProductVariantDTO productVariantDTO = await _productVariantRepository.AddProductVariantAsync(newVariant);

                    foreach (AddSpecificationRequest specification in variant.Specifications)
                    {
                        ProductSpecification productSpecification = new ProductSpecification
                        {
                            ProductSpecificationGroupId = specification.SpecificationGroupId,
                            Key = specification.Key,
                            Value = specification.Value,
                            DisplayOrder = specification.DisplayOrder,
                            IsSpecial = specification.IsSpecial,
                            ProductVariantId = productVariantDTO.ProductId,
                        };
                        await _productSpecificationRepository.AddProductSpecificationAsync(productSpecification);
                    }

                    foreach (var productImage in variant.ProductImages)
                    {
                        await _productImageRepository.AddProductImageAsync(new ProductImage
                        {
                            ProductVariantId = productVariantDTO.ProductVariantId,
                            ImageUrl = productImage.ImageUrl,
                        });
                    }
                }

                await transaction.CommitAsync(); // Xác nhận lưu vào database
                var response = Response<ProductDTO>.CreateSuccessResponse(null, "Sản phẩm và các biến thể đã được thêm thành công!");
                return Ok(response);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(); // Hủy tất cả nếu có lỗi
                return StatusCode(500, new { message = "Lỗi khi thêm sản phẩm", error = ex.Message });
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
