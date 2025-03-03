using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Enums;
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
        public async Task<ICollection<Review>> GetAllReviewsAsync()
        {
            return await _context.Reviews.ToListAsync();
        }

        // Lấy đánh giá theo ReviewId
        public async Task<Review> GetReviewByIdAsync(int reviewId)
        {
            var review = await _context.Reviews.FirstOrDefaultAsync(r => r.ReviewId == reviewId);
            if (review == null)
            {
                throw new KeyNotFoundException("Review not found.");
            }
            return review;
        }

        public async Task<PagedResponse<ICollection<Review>>> GetReviewsByProductIdAsync(int productVariantId, int page, int pageSize)
        {
            var query = _context.Reviews
                .Where(r => r.ProductVariantId == productVariantId)
                .Include(r => r.User);

            int totalRecords = await query.CountAsync();
            int totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize); 

            var reviews = await query
                .OrderByDescending(r => r.CreatedAt)
                .Skip((page - 1) * pageSize) 
                .Take(pageSize) 
                .ToListAsync();

            return PagedResponse<ICollection<Review>>.CreatePagedResponse(reviews, page, pageSize, totalRecords, "Danh sách đánh giá của sản phẩm");
        }


        // Lấy các đánh giá của người dùng theo UserId
        public async Task<ICollection<Review>> GetReviewsByUserIdAsync(int userId)
        {
            return await _context.Reviews.Where(r => r.UserId == userId).ToListAsync();
        }

        public async Task<Review> AddReviewAsync(Review review)
        {
            bool isVerifiedPurchase = await _context.Orders
                .Where(o => o.UserId == review.UserId && o.Status == OrderStatusEnum.delivered.ToString()) 
                .AnyAsync(o => o.OrderDetails.Any(od => od.ProductVariantId == review.ProductVariantId));

            review.VerifiedPurchase = isVerifiedPurchase;

            var newReview = await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();

            return newReview.Entity;
        }


        // Cập nhật đánh giá
        public async Task<bool> UpdateReviewAsync(int reviewId, Review review)
        {
            var existingReview = await _context.Reviews.FindAsync(reviewId);
            if (existingReview == null)
            {
                throw new KeyNotFoundException("Review not found.");
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
                throw new KeyNotFoundException("Review not found.");
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
