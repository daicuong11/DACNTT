using Microsoft.AspNetCore.Mvc;
using PhoneStoreBackend.Api.Request;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/product-specification-groups")]
    [ApiController]
    public class ProductSpecificationGroupController : ControllerBase
    {
        private readonly IProductSpecificationGroupRepository _productSpecGroupRepository;

        public ProductSpecificationGroupController(IProductSpecificationGroupRepository productSpecificationRepository)
        {
            _productSpecGroupRepository = productSpecificationRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProductSpecGroups()
        {
            try
            {
                var groups = await _productSpecGroupRepository.GetAllProductSpecificationGroupsAsync();
                var response = Response<List<ProductSpecificationGroupDTO>>.CreateSuccessResponse(groups, "Lấy danh sách nhóm thông số kỹ thuật thành công");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        /// <summary>
        /// Lấy thông tin nhóm thông số kỹ thuật theo ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductSpecGroupById(int id)
        {
            try
            {
                var group = await _productSpecGroupRepository.GetProductSpecificationGroupByIdAsync(id);
                if (group == null)
                {
                    return NotFound(Response<object>.CreateErrorResponse("Nhóm thông số kỹ thuật không tồn tại"));
                }

                var response = Response<ProductSpecificationGroupDTO>.CreateSuccessResponse(group, "Lấy thông tin nhóm thông số kỹ thuật thành công");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddProductSpecGroup([FromBody] ProductSpecificationGroupRequest model)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                var specGroup = new ProductSpecificationGroup
                {
                    GroupName = model.GroupName,
                    DisplayOrder = model.DisplayOrder,
                    CategoryId = model.CategoryId,

                };

                var createdSpecGroup = await _productSpecGroupRepository.AddProductSpecificationGroupAsync(specGroup);
                var response = Response<ProductSpecificationGroupDTO>.CreateSuccessResponse(createdSpecGroup, "Nhóm thông số kỹ thuật đã được thêm thành công");
                return CreatedAtAction(nameof(GetProductSpecGroupById), new { id = createdSpecGroup.ProductSpecificationGroupId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost("add-list/{id}")]
        public async Task<IActionResult> AddListSpecGroupOfCategory(int id, List<ProductSpecificationGroupRequest> specGroups)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                List<ProductSpecificationGroup> newSpecGroups = specGroups.Select(sg => new ProductSpecificationGroup { 
                    GroupName = sg.GroupName,
                    DisplayOrder = sg.DisplayOrder,
                    CategoryId = id,
                }).ToList();

                var createSpecGroups = await _productSpecGroupRepository.AddListSpecOfACategoryAsync(newSpecGroups);

                var response = Response<List<ProductSpecificationGroupDTO>>.CreateSuccessResponse(createSpecGroups, "Nhóm thông số kỹ thuật đã được thêm thành công");
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
