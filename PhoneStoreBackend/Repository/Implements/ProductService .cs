using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository.Implements
{
    public class ProductService : IProductRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ProductService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy danh sách tất cả sản phẩm
        public async Task<ICollection<ProductDTO>> GetAllAsync()
        {
            var products = await _context.Products.Include(p => p.Category).ToListAsync();
            return products.Select(p => _mapper.Map<ProductDTO>(p)).ToList();
        }

        // Lấy sản phẩm theo ID
        public async Task<ProductDTO> GetProductByIdAsync(int id)
        {
            var product = await _context.Products.Include(p => p.Category).Include(p => p.Brand).FirstOrDefaultAsync(p => p.ProductId == id);
            if (product == null)
            {
                throw new Exception("Product not found.");
            }
            return _mapper.Map<ProductDTO>(product);
        }

        // Thêm mới một sản phẩm
        public async Task<ProductDTO> AddProductAsync(Product product)
        {
            var newProduct = await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return _mapper.Map<ProductDTO>(newProduct.Entity);
        }

        // Cập nhật thông tin sản phẩm
        public async Task<bool> UpdateProductAsync(int id, Product updatedProduct)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                throw new Exception("Product not found.");
            }

            product.Name = updatedProduct.Name;
            product.Description = updatedProduct.Description;
            product.CategoryId = updatedProduct.CategoryId;
            product.BrandId = updatedProduct.BrandId;

            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return true;
        }

        // Xóa sản phẩm
        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                throw new Exception("Product not found.");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        // Tìm kiếm sản phẩm theo tên
        public async Task<ICollection<ProductDTO>> SearchProductsAsync(string keyword)
        {
            var products = await _context.Products
                .Where(p => p.Name.Contains(keyword))
                .Include(p => p.Category)
                .ToListAsync();

            return products.Select(p => _mapper.Map<ProductDTO>(p)).ToList();
        }
    }
}
