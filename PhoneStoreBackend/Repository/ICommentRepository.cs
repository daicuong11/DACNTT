﻿using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface ICommentRepository
    {
        Task<Comment> AddCommentAsync(Comment comment);

        Task<Reply> ReplyAsync(Reply reply);

        Task<PagedResponse<ICollection<Comment>>> GetCommentByVariantId(int variantId, int page, int pageSize);
        Task<List<CommentResponse>> GetRecentCommentsAsync(int count);
        Task<List<CommentResponse>> GetRecentCommentsAsync(int page, int pageSize);

    }
}

