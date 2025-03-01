using Microsoft.EntityFrameworkCore;
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

        public async Task<ICollection<Comment>> GetCommentByVariantId(int variantId)
        {
            return await _context.Comments
                .Where(c => c.ProductVariantId == variantId)
                .Include(c => c.Replies) 
                .ThenInclude(r => r.User)
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
        }

        public async Task<Reply> ReplyAsync(Reply reply)
        {
            var entities = await _context.Replies.AddAsync(reply);
            await _context.SaveChangesAsync();
            return entities.Entity; 
        }
    }
}
