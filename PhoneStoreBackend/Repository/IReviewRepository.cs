using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository
{
    public interface IReviewRepository
    {
        Task<ICollection<ReviewDTO>> GetAllReviewsAsync();
        Task<ReviewDTO> GetReviewByIdAsync(int reviewId);
        Task<ICollection<ReviewDTO>> GetReviewsByProductIdAsync(int productId);
        Task<ICollection<ReviewDTO>> GetReviewsByUserIdAsync(int userId);
        Task<ReviewDTO> AddReviewAsync(Review review);
        Task<bool> UpdateReviewAsync(int reviewId, Review review);
        Task<bool> DeleteReviewAsync(int reviewId);
    }
}
