﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/product-specifications")]
    [ApiController]
    public class ProductSpecificationController : ControllerBase
    {
        private readonly IProductSpecificationRepository _productSpecificationRepository;

        public ProductSpecificationController(IProductSpecificationRepository productSpecificationRepository)
        {
            _productSpecificationRepository = productSpecificationRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProductSpecifications()
        {
            try
            {
                var specifications = await _productSpecificationRepository.GetAllProductSpecificationsAsync();
                var response = Response<ICollection<ProductSpecificationDTO>>.CreateSuccessResponse(specifications, "Danh sách tất cả thông số kỹ thuật sản phẩm");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductSpecificationById(int id)
        {
            try
            {
                var specification = await _productSpecificationRepository.GetProductSpecificationByIdAsync(id);
                if (specification == null)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy thông số kỹ thuật sản phẩm.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<ProductSpecificationDTO>.CreateSuccessResponse(specification, "Thông tin thông số kỹ thuật sản phẩm");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("variant/{id}")]
        public async Task<IActionResult> GetProductSpecGroupByVariantId(int id)
        {
            try
            {
                var group = await _productSpecificationRepository.GetProductSpecificationsByVariantIdAsync(id);
                if (group == null)
                {
                    return NotFound(Response<object>.CreateErrorResponse("Nhóm thông số kỹ thuật không tồn tại"));
                }

                var response = Response<ICollection<ProductSpecificationGroupDTO>>.CreateSuccessResponse(group, "Lấy thông tin nhóm thông số kỹ thuật thành công");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("variant/special/{id}")]
        public async Task<IActionResult> GetProductSpecSpecialByVariantId(int id)
        {
            try
            {
                var group = await _productSpecificationRepository.GetProductSpecificationsSpecialByVariantIdAsync(id);
                if (group == null)
                {
                    return NotFound(Response<object>.CreateErrorResponse("Nhóm thông số kỹ thuật không tồn tại"));
                }

                var response = Response<ICollection<ProductSpecificationDTO>>.CreateSuccessResponse(group, "Lấy thông tin nhóm thông số kỹ thuật thành công");
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
        public async Task<IActionResult> AddProductSpecification([FromBody] SpecificationRequest specificationReq)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var specification = new ProductSpecification
                {
                    ProductSpecificationGroupId = specificationReq.ProductSpecificationGroupId,
                    ProductVariantId = specificationReq.ProductVariantId,
                    Key = specificationReq.Key,
                    Value = specificationReq.Value,
                    DisplayOrder = specificationReq.DisplayOrder,
                    IsSpecial = specificationReq.IsSpecial,
                };

                var createdSpecification = await _productSpecificationRepository.AddProductSpecificationAsync(specification);
                var response = Response<ProductSpecificationDTO>.CreateSuccessResponse(createdSpecification, "Thông số kỹ thuật sản phẩm đã được thêm thành công");
                return CreatedAtAction(nameof(GetProductSpecificationById), new { id = createdSpecification.SpecificationId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateProductSpecification(int id, [FromBody] SpecificationRequest specificationReq)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var specification = new ProductSpecification
                {
                    ProductSpecificationGroupId = specificationReq.ProductSpecificationGroupId,
                    ProductVariantId = specificationReq.ProductVariantId,
                    Key = specificationReq.Key,
                    Value = specificationReq.Value,
                    DisplayOrder = specificationReq.DisplayOrder,
                    IsSpecial = specificationReq.IsSpecial,
                };

                var isUpdated = await _productSpecificationRepository.UpdateProductSpecificationAsync(id, specification);
                if (!isUpdated)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy thông số kỹ thuật sản phẩm để cập nhật.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Thông số kỹ thuật sản phẩm đã được cập nhật thành công");
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
        public async Task<IActionResult> DeleteProductSpecification(int id)
        {
            try
            {
                var isDeleted = await _productSpecificationRepository.DeleteProductSpecificationAsync(id);
                if (!isDeleted)
                {
                    var notFoundResponse = Response<object>.CreateErrorResponse("Không tìm thấy thông số kỹ thuật sản phẩm để xóa.");
                    return NotFound(notFoundResponse);
                }

                var response = Response<object>.CreateSuccessResponse(null, "Thông số kỹ thuật sản phẩm đã được xóa thành công");
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
