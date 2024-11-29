﻿using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IProductRepository
    {
        Task<ICollection<ProductDTO>> GetAllAsync();
        Task<ProductDTO> GetProductByIdAsync(int id);
        Task<ProductDTO> AddProductAsync(Product product);
        Task<bool> UpdateProductAsync(int id, Product updatedProduct);
        Task<bool> DeleteProductAsync(int id);
        Task<ICollection<ProductDTO>> SearchProductsAsync(string keyword);
    }
}
