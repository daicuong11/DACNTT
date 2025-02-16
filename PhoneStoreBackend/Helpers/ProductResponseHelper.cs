using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Helpers
{
    public static class ProductResponseHelper
    {
        /// <summary>
        /// Chuyển đổi một sản phẩm Product entity thành ProductResponse DTO.
        /// </summary>
        public static ProductResponse MapToProductResponse(Product product)
        {
            return new ProductResponse
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Brand = new BrandResponse
                {
                    BrandId = product.BrandId,
                    Name = product.Brand.Name,
                },
                Category = new CategoryRespone
                {
                    CategoryId = product.CategoryId,
                    Name = product.Category.Name,
                },
                ProductVariants = product.ProductVariants.Select(v => new ProductVariantResponse
                {
                    Slug = v.Slug,
                    DiscountPercentage = v.Discount?.Percentage ?? 0,
                    Price = v.Price,
                    ImageUrl = v.ProductImages
                        .OrderByDescending(img => img.IsMain)
                        .Select(img => img.ImageUrl)
                        .FirstOrDefault() ?? "default-image-url.jpg",

                    RAM = ProductSpecificationHelper.GetSpecificationValue(v.ProductSpecifications, "ram"),
                    ScreenSize = ProductSpecificationHelper.GetSpecificationValue(v.ProductSpecifications, "screen size"),
                    Storage = ProductSpecificationHelper.GetSpecificationValue(v.ProductSpecifications, "ổ cứng", "bộ nhớ trong")
                }).ToList(),
            };
        }

        /// <summary>
        /// Chuyển đổi danh sách sản phẩm Product entity thành danh sách ProductResponse DTO.
        /// </summary>
        public static List<ProductResponse> MapToProductResponseList(IEnumerable<Product> products)
        {
            return products.Select(MapToProductResponse).ToList();
        }
    }


}
