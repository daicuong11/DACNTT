using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IReviewRepository
    {
        Task<ICollection<Review>> GetAllReviewsAsync();
        Task<Review> GetReviewByIdAsync(int reviewId);
        Task<PagedResponse<ICollection<Review>>> GetReviewsByProductIdAsync(int productVariantId, int page, int pageSize, Dictionary<string, string>? filters);
        Task<ICollection<Review>> GetReviewsByUserIdAsync(int userId);
        Task<Review> AddReviewAsync(Review review);
        Task<bool> UpdateReviewAsync(int reviewId, Review review);
        Task<bool> DeleteReviewAsync(int reviewId);

        Task<ReviewResponse> GetReviewDetailOfVariant(int variantId);
    }
}
