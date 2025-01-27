using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class ReviewService : IReviewRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ReviewService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả các đánh giá
        public async Task<ICollection<ReviewDTO>> GetAllReviewsAsync()
        {
            var reviews = await _context.Reviews.ToListAsync();
            return reviews.Select(r => _mapper.Map<ReviewDTO>(r)).ToList();
        }

        // Lấy đánh giá theo ReviewId
        public async Task<ReviewDTO> GetReviewByIdAsync(int reviewId)
        {
            var review = await _context.Reviews.FirstOrDefaultAsync(r => r.ReviewId == reviewId);
            if (review == null)
            {
                throw new Exception("Review not found.");
            }
            return _mapper.Map<ReviewDTO>(review);
        }

        // Lấy các đánh giá của sản phẩm theo ProductId
        public async Task<ICollection<ReviewDTO>> GetReviewsByProductIdAsync(int productVariantId)
        {
            var reviews = await _context.Reviews.Where(r => r.ProductVariantId == productVariantId).ToListAsync();
            return reviews.Select(r => _mapper.Map<ReviewDTO>(r)).ToList();
        }

        // Lấy các đánh giá của người dùng theo UserId
        public async Task<ICollection<ReviewDTO>> GetReviewsByUserIdAsync(int userId)
        {
            var reviews = await _context.Reviews.Where(r => r.UserId == userId).ToListAsync();
            return reviews.Select(r => _mapper.Map<ReviewDTO>(r)).ToList();
        }

        // Thêm đánh giá cho sản phẩm
        public async Task<ReviewDTO> AddReviewAsync(Review review)
        {
            var newReview = await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
            return _mapper.Map<ReviewDTO>(newReview.Entity);
        }

        // Cập nhật đánh giá
        public async Task<bool> UpdateReviewAsync(int reviewId, Review review)
        {
            var existingReview = await _context.Reviews.FindAsync(reviewId);
            if (existingReview == null)
            {
                throw new Exception("Review not found.");
            }

            existingReview.Rating = review.Rating;
            existingReview.Comment = review.Comment;

            _context.Reviews.Update(existingReview);
            await _context.SaveChangesAsync();

            return true;
        }

        // Xóa đánh giá
        public async Task<bool> DeleteReviewAsync(int reviewId)
        {
            var review = await _context.Reviews.FindAsync(reviewId);
            if (review == null)
            {
                throw new Exception("Review not found.");
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
