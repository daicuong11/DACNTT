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
            return entities.Entity;
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
    }
}
