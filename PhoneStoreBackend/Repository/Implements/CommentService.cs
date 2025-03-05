using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository.Implements
{
    public class CommentService : ICommentRepository
    {
        private readonly AppDbContext _context;
        public CommentService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Comment> AddCommentAsync(Comment comment)
        {
            var entities = await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

            // Nạp lại Comment để đảm bảo có User
            return await _context.Comments
                .Include(c => c.User) // ✅ Load User vào Comment
                .Include(c => c.ProductVariant) // Nếu cần
                .FirstOrDefaultAsync(c => c.CommentId == entities.Entity.CommentId);
        }


        public async Task<PagedResponse<ICollection<Comment>>> GetCommentByVariantId(int variantId, int page, int pageSize)
        {
            var query = _context.Comments
                .Where(c => c.ProductVariantId == variantId)
                .Include(c => c.User)
                .Include(c => c.Replies)
                .ThenInclude(r => r.User)
                .OrderByDescending(c => c.CreatedAt);

            int totalItems = await query.CountAsync();

            var comments = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return PagedResponse<ICollection<Comment>>.CreatePagedResponse(comments, page, pageSize, totalItems, "Danh sách bình luận");
        }


        public async Task<Reply> ReplyAsync(Reply reply)
        {
            var entities = await _context.Replies.AddAsync(reply);
            await _context.SaveChangesAsync();
            return entities.Entity;
        }
        public async Task<List<CommentResponse>> GetRecentCommentsAsync(int count)
        {
            return await _context.Comments
                .Include(c => c.User)
                .Include(c => c.ProductVariant)
                    .ThenInclude(pv => pv.Product)
                        .ThenInclude(p => p.Category) // Load Category
                .Include(c => c.ProductVariant)
                    .ThenInclude(pv => pv.Product)
                        .ThenInclude(p => p.Brand) // Load Brand
                .OrderByDescending(c => c.CreatedAt)
                .Take(count)
                .Select(c => new CommentResponse
                {
                    CommentId = c.CommentId,
                    UserName = c.User.Name,
                    ProductName = c.ProductVariant.Product.Name,
                    VariantName = c.ProductVariant.VariantName,
                    CategoryName = c.ProductVariant.Product.Category.Name, // Lấy Category
                    BrandName = c.ProductVariant.Product.Brand.Name, // Lấy Brand
                    Content = c.Content,
                    CreatedAt = c.CreatedAt,
                    Slug = c.ProductVariant.Slug
                })
                .ToListAsync();
        }

        public async Task<List<CommentResponse>> GetRecentCommentsAsync(int page, int pageSize)
        {
            return await _context.Comments
                .Include(c => c.User)
                .Include(c => c.ProductVariant)
                    .ThenInclude(pv => pv.Product)
                        .ThenInclude(p => p.Category)
                .Include(c => c.ProductVariant.Product.Brand)
                .OrderByDescending(c => c.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(c => new CommentResponse
                {
                    CommentId = c.CommentId,
                    UserName = c.User.Name,
                    ProductName = c.ProductVariant.Product.Name,
                    VariantName = c.ProductVariant.VariantName,
                    CategoryName = c.ProductVariant.Product.Category.Name,
                    BrandName = c.ProductVariant.Product.Brand.Name,
                    Content = c.Content,
                    CreatedAt = c.CreatedAt
                })
                .ToListAsync();
        }




    }
}
