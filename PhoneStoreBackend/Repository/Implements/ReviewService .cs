using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Enums;

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
            var list = await _context.Reviews
                .Include(r => r.User) // Lấy thông tin User
                .Include(r => r.ProductVariant)
                    .ThenInclude(pv => pv.Product) // Lấy Product trong ProductVariant
                        .ThenInclude(p => p.Category) // Lấy Category trong Product
                .Include(r => r.ProductVariant)
                    .ThenInclude(pv => pv.Product) // Lấy lại Product để thêm Brand
                        .ThenInclude(p => p.Brand) // Lấy Brand trong Product
                .ToListAsync();

            return _mapper.Map<ICollection<ReviewDTO>>(list);
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

        public async Task<PagedResponse<ICollection<Review>>> GetReviewsByProductIdAsync(
    int productVariantId,
    int page,
    int pageSize,
    Dictionary<string, string>? filters)
        {
            var query = _context.Reviews
                .Where(r => r.ProductVariantId == productVariantId)
                .Include(r => r.User)
                .AsQueryable(); // Chuyển thành IQueryable để áp dụng filter

            // ✅ Áp dụng bộ lọc nếu có
            if (filters != null)
            {
                foreach (var filter in filters)
                {
                    switch (filter.Key.ToLower())
                    {
                        case "hasimages":
                            if (bool.TryParse(filter.Value, out bool hasImages))
                                query = query.Where(r => r.HasImages == hasImages);
                            break;

                        case "verifiedpurchase":
                            if (bool.TryParse(filter.Value, out bool verifiedPurchase))
                                query = query.Where(r => r.VerifiedPurchase == verifiedPurchase);
                            break;

                        case "rating":
                            if (int.TryParse(filter.Value, out int rating) && rating >= 1 && rating <= 5)
                                query = query.Where(r => r.Rating == rating);
                            break;
                    }
                }
            }

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

        public async Task<ReviewResponse> GetReviewDetailOfVariant(int variantId)
        {
            var reviews = await _context.Reviews
                .Where(r => r.ProductVariantId == variantId)
                .ToListAsync();

            if (reviews.Count == 0)
            {
                return new ReviewResponse
                {
                    TotalReview = 0,
                    Total5Rate = 0,
                    Total4Rate = 0,
                    Total3Rate = 0,
                    Total2Rate = 0,
                    Total1Rate = 0,
                    RateAverage = 0.0
                };
            }

            var total = reviews.Count;
            var total5 = reviews.Count(r => r.Rating == 5);
            var total4 = reviews.Count(r => r.Rating == 4);
            var total3 = reviews.Count(r => r.Rating == 3);
            var total2 = reviews.Count(r => r.Rating == 2);
            var total1 = reviews.Count(r => r.Rating == 1);
            var average = reviews.Average(r => r.Rating);

            return new ReviewResponse
            {
                TotalReview = total,
                Total5Rate = total5,
                Total4Rate = total4,
                Total3Rate = total3,
                Total2Rate = total2,
                Total1Rate = total1,
                RateAverage = average
            };
        }
        public async Task<Review> UpdateReviewReplyAsync(int reviewId, bool isReply)
        {
            var review = await _context.Reviews.FindAsync(reviewId);
            if (review == null)
            {
                throw new KeyNotFoundException("Không tìm thấy đánh giá!");
            }

            review.IsReply = isReply;
            review.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return review;
        }

    }
}
