﻿using Microsoft.AspNetCore.Authorization;
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
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly CloudinaryService _cloudinaryService;

        public CategoryController(ICategoryRepository categoryRepository, CloudinaryService cloudinaryService)
        {
            _categoryRepository = categoryRepository;
            _cloudinaryService = cloudinaryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await _categoryRepository.GetAllAsync();
                var response = Response<ICollection<CategoryDTO>>.CreateSuccessResponse(categories, "Danh sách danh mục");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            try
            {
                var category = await _categoryRepository.GetByIdAsync(id);
                if (category == null)
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy danh mục");
                    return NotFound(errorResponse);
                }
                var response = Response<CategoryDTO>.CreateSuccessResponse(category, "Thông tin danh mục");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory([FromForm] CategoryRequest category)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);


                string imageUrl = null;

                if (category.Image != null)
                {
                    imageUrl = await _cloudinaryService.UploadImageAsync(category.Image, "Categories");
                }

                var createCategory = new Category
                {
                    Name = category.Name,
                    Description = category.Description,
                    ImageUrl = imageUrl,
                };
                var newCategory = await _categoryRepository.AddAsync(createCategory);
                var response = Response<CategoryDTO>.CreateSuccessResponse(newCategory, "Danh mục đã được tạo");
                return CreatedAtAction(nameof(GetCategoryById), new { id = newCategory.CategoryId }, response);
            }
            catch (Exception ex)
            {
                var errorResponse = Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}");
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromForm] CategoryRequest category)
        {
            try
            {
                var responseError = ModelStateHelper.CheckModelState(ModelState);
                if (responseError != null)
                    return BadRequest(responseError);

                string imageUrl = null;

                if (category.Image != null)
                {
                    imageUrl = await _cloudinaryService.UploadImageAsync(category.Image, "Categories");
                }

                var createCategory = new Category
                {
                    Name = category.Name,
                    Description = category.Description,
                    ImageUrl = imageUrl,
                };

                var updatedCategory = await _categoryRepository.UpdateAsync(id, createCategory);
                if (updatedCategory == null)
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy danh mục để cập nhật");
                    return NotFound(errorResponse);
                }
                var response = Response<CategoryDTO>.CreateSuccessResponse(updatedCategory, "Danh mục đã được cập nhật");
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
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var result = await _categoryRepository.DeleteAsync(id);
                if (result)
                {
                    var response = Response<object>.CreateSuccessResponse(null, "Danh mục đã bị xóa");
                    return Ok(response);
                }
                else
                {
                    var errorResponse = Response<object>.CreateErrorResponse("Không tìm thấy danh mục để xóa");
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
