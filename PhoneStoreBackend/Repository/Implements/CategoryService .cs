﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using System.Text.Json;

namespace PhoneStoreBackend.Repository.Implements
{
    public class CategoryService : ICategoryRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CategoryService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ICollection<CategoryDTO>> GetAllAsync()
        {
            var categories = await _context.Categories.Include(c => c.ProductSpecificationGroups).ToListAsync();
            
            return _mapper.Map<ICollection<CategoryDTO>>(categories);
        }

        public async Task<CategoryDTO> GetByIdAsync(int id)
        {
            var category = await _context.Categories
                .Include(c => c.ProductSpecificationGroups)
                .FirstOrDefaultAsync(c => c.CategoryId == id);

            if (category == null)
            {
                throw new KeyNotFoundException("Category not found.");
            }

            return _mapper.Map<CategoryDTO>(category);
        }


        public async Task<CategoryDTO> AddAsync(Category category)
        {
            var newCategory = await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return _mapper.Map<CategoryDTO>(newCategory.Entity);
        }

        public async Task<CategoryDTO> UpdateAsync(int id, Category category)
        {
            var existingCategory = await _context.Categories.FindAsync(id);
            if (existingCategory == null)
            {
                throw new KeyNotFoundException("Category not found.");
            }

            existingCategory.Name = category.Name;
            existingCategory.Description = category.Description;

            _context.Categories.Update(existingCategory);
            await _context.SaveChangesAsync();

            return _mapper.Map<CategoryDTO>(existingCategory);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                throw new KeyNotFoundException("Category not found.");
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
