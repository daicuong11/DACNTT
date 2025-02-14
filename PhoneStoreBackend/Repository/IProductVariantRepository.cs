﻿using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IProductVariantRepository
    {
        Task<ICollection<ProductVariantDTO>> GetAllAsync();
        Task<ProductVariantDTO> GetProductVariantById(int id);
        Task<ICollection<ProductVariantDTO>> GetProductVariantByProductId(int id);
        Task<ICollection<ProductVariantDTO>> GetAllProductVariantOfMobile();
        Task<ICollection<ProductVariantDTO>> GetAllProductVariantOfLaptop();
        Task<ProductVariantDTO> AddProductVariantAsync(ProductVariant productVariant);
        Task<bool> UpdateProductVariantAsync(int id, ProductVariant productVariant);
        Task<bool> DeleteProductVariantAsync(int id);
        Task<bool> AnySlugExistsAsync(string slug);
    }
}
