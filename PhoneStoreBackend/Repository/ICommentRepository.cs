using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface ICommentRepository
    {
        Task<Comment> AddCommentAsync(Comment comment);

        Task<Reply> ReplyAsync(Reply reply);

        Task<ICollection<Comment>> GetCommentByVariantId (int  variantId);
    }
}
