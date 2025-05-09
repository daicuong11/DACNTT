﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository.Implements
{
    public class BrandService : IBrandRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public BrandService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả thương hiệu
        public async Task<ICollection<Brand>> GetAllAsync()
        {
            var brands = await _context.Brands.ToListAsync();
            return brands;
        }

        // Lấy thương hiệu theo BrandId
        public async Task<BrandDTO> GetBrandByIdAsync(int brandId)
        {
            var brand = await _context.Brands
                                       .FirstOrDefaultAsync(b => b.BrandId == brandId);
            if (brand == null)
            {
                throw new KeyNotFoundException("Brand not found.");
            }

            return _mapper.Map<BrandDTO>(brand);
        }

        // Thêm thương hiệu mới
        public async Task<BrandDTO> AddBrandAsync(Brand brand)
        {
            var newBrand = await _context.Brands.AddAsync(brand);
            await _context.SaveChangesAsync();
            return _mapper.Map<BrandDTO>(newBrand.Entity);
        }

        // Cập nhật thông tin thương hiệu
        public async Task<bool> UpdateBrandAsync(int brandId, Brand brand)
        {
            var existingBrand = await _context.Brands.FindAsync(brandId);
            if (existingBrand == null)
            {
                throw new KeyNotFoundException("Brand not found.");
            }

            existingBrand.Name = brand.Name;
            existingBrand.Description = brand.Description;
            existingBrand.ImageUrl = brand.ImageUrl;

            _context.Brands.Update(existingBrand);
            await _context.SaveChangesAsync();

            return true;
        }

        // Xóa thương hiệu
        public async Task<bool> DeleteBrandAsync(int brandId)
        {
            var brand = await _context.Brands.FindAsync(brandId);
            if (brand == null)
            {
                throw new KeyNotFoundException("Brand not found.");
            }

            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<ICollection<Brand>> GetAllByCategoryNameAsync(string categoryName)
        {
            if (string.IsNullOrEmpty(categoryName))
            {
                return new List<Brand>(); 
            }

            var brands = await _context.Products
                .Where(p => p.Category.Name == categoryName) 
                .Select(p => p.Brand)                        
                .Distinct()                                  
                .ToListAsync();                             

            return brands; 
        }
    }
}
