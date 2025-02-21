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
                var response = Response<ICollection<ProductResponse>>.CreateSuccessResponse(products, "Danh sách tất cả sản phẩm");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("mobile")]
        public async Task<IActionResult> GetAllProductOfMobile()
        {
            try
            {
                var productVariants = await _productRepository.GetAllProductOfMobile();
                var response = Response<ICollection<ProductResponse>>.CreateSuccessResponse(productVariants, "Danh sách sản phẩm: ");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("laptop")]
        public async Task<IActionResult> GetAllProductOfLaptop()
        {
            try
            {
                var productVariants = await _productRepository.GetAllProductOfLaptop();
                var response = Response<ICollection<ProductResponse>>.CreateSuccessResponse(productVariants, "Danh sách sản phẩm: ");
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

        [HttpGet("{id}/similar")]
        public async Task<IActionResult> GetSimilarProducts(int id)
        {
            try
            {
                var product = await _productRepository.GetSimilarProductsAsync(id);

                var response = Response<ICollection<ProductResponse>>.CreateSuccessResponse(product, "Thông tin sản phẩm");
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
            var responseError = ModelStateHelper.CheckModelState(ModelState);
            if (responseError != null)
                return BadRequest(responseError);

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

                foreach (ListVariantRequest variantItem in model.listVariant)
                {
                    if (variantItem.Variant == null)
                    {
                        throw new Exception("Thông tin phiên bản sản phẩm không được để trống");
                    }

                    ProductVariantRequest variantReq = variantItem.Variant;
                    List<AddProductImageRequest> listProductImageReq = variantItem.ProductImages;
                    List<AddSpecificationRequest> listSpecificationReq = variantItem.Specifications;

                    // Kiểm tra slug đã tồn tại chưa
                    bool isSlugExists = await _productVariantRepository.AnySlugExistsAsync(variantReq.Slug);
                    if (isSlugExists)
                    {
                        variantReq.Slug = variantReq.Slug + ' ' + Guid.NewGuid().ToString();
                        bool doubleCheckIsSlugExists = await _productVariantRepository.AnySlugExistsAsync(variantReq.Slug);
                        if (doubleCheckIsSlugExists)
                        {
                            return BadRequest($"Slug '{variantReq.Slug}' đã tồn tại.");
                        }
                    }

                    ProductVariant newVariant = new ProductVariant
                    {
                        VariantName = variantReq.VariantName,
                        ProductId = productDTO.ProductId,
                        Slug = variantReq.Slug,
                        Color = variantReq.Color,
                        Storage = variantReq.Storage,
                        ImageUrl = listProductImageReq.FirstOrDefault(i => i.IsMain)?.ImageUrl ?? "",
                        Price = variantReq.Price,
                        ImportPrice = variantReq.ImportPrice,
                        Stock = variantReq.Stock,
                    };

                    if(variantReq.DiscountId >= 0)
                    {
                        newVariant.DiscountId = variantReq.DiscountId;
                    }

                    ProductVariantDTO productVariantDTO = await _productVariantRepository.AddProductVariantAsync(newVariant);

                    // Add specs to db
                    foreach (AddSpecificationRequest specification in listSpecificationReq)
                    {
                        ProductSpecification productSpecification = new ProductSpecification
                        {
                            ProductSpecificationGroupId = specification.ProductSpecificationGroupId,
                            ProductVariantId = productVariantDTO.ProductVariantId,
                            Key = specification.Key,
                            Value = specification.Value,
                            DisplayOrder = specification.DisplayOrder,
                            IsSpecial = specification.IsSpecial,
                        };
                        await _productSpecificationRepository.AddProductSpecificationAsync(productSpecification);
                    }

                    foreach (AddProductImageRequest productImage in listProductImageReq)
                    {
                        await _productImageRepository.AddProductImageAsync(new ProductImage
                        {
                            ProductVariantId = productVariantDTO.ProductVariantId,
                            ImageUrl = productImage.ImageUrl,
                            IsMain = productImage.IsMain,
                        });
                    }
                }

                await transaction.CommitAsync(); // Xác nhận lưu vào database
                var response = Response<ProductDTO>.CreateSuccessResponse(productDTO, "Sản phẩm và các biến thể đã được thêm thành công!");
                return Ok(response);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(); // Hủy tất cả nếu có lỗi
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
