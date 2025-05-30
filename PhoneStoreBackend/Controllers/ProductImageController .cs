﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;
using PhoneStoreBackend.Repository.Implements;
using System.Drawing.Drawing2D;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/product-images")]
    [ApiController]
    public class ProductImageController : ControllerBase
    {
        private readonly IProductImageRepository _productImageRepository;
        private readonly CloudinaryService _cloudinaryService;

        public ProductImageController(IProductImageRepository productImageRepository, CloudinaryService cloudinaryService)
        {
            _productImageRepository = productImageRepository;
            _cloudinaryService = cloudinaryService;
        }

        [HttpGet]
        //[Authorize(Roles = "ADMIN")]
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
        //[Authorize]
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
        public async Task<IActionResult> AddProductImage([FromBody] ProductImageRequest productImage)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                string imageUrl = null;

                if (productImage.Image != null)
                {
                    imageUrl = await _cloudinaryService.UploadImageAsync(productImage.Image, "Product Images");
                }

                var createProductImage = new ProductImage
                {
                    ProductVariantId = productImage.ProductVariantId,
                    ImageUrl = imageUrl,
                    IsMain = productImage.IsMain,
                };

                var createdImage = await _productImageRepository.AddProductImageAsync(createProductImage);
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
        public async Task<IActionResult> UpdateProductImage(int id, [FromBody] ProductImageRequest productImage)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                string imageUrl = null;

                if (productImage.Image != null)
                {
                    imageUrl = await _cloudinaryService.UploadImageAsync(productImage.Image, "Product Images");
                }

                var createProductImage = new ProductImage
                {
                    ProductVariantId = productImage.ProductVariantId,
                    ImageUrl = imageUrl,
                    IsMain = productImage.IsMain,
                };

                var isUpdated = await _productImageRepository.UpdateProductImageAsync(id, createProductImage);
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
