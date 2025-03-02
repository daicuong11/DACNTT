using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.DbContexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductVariant> ProductVariants { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<ProductSpecification> ProductSpecifications { get; set; }
        public DbSet<ProductSpecificationGroup> ProductSpecificationGroups { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Reply> Replies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>()
                .HasOne(c => c.Order)
                .WithOne(o => o.Customer)
                .HasForeignKey<Order>(o => o.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Payment)
                .WithOne(p => p.Order)
                .HasForeignKey<Payment>(p => p.OrderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.Sender)
                .WithMany(u => u.SentNotifications)
                .HasForeignKey(n => n.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.Id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ProductSpecification>()
                .HasOne(ps => ps.ProductVariant)
                .WithMany(pv => pv.ProductSpecifications)
                .HasForeignKey(ps => ps.ProductVariantId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ProductSpecification>()
                .HasOne(ps => ps.ProductSpecificationGroup)
                .WithMany(psg => psg.ProductSpecifications)
                .HasForeignKey(ps => ps.ProductSpecificationGroupId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Reply>()
                .HasOne(r => r.Comment)
                .WithMany(c => c.Replies)
                .HasForeignKey(r => r.CommentId)
                .OnDelete(DeleteBehavior.Cascade); 

            modelBuilder.Entity<Reply>()
                .HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.NoAction); 


            //DatabaseSeeder.Seed(modelBuilder); // migration add SeedData -> update-database
        }
    }
}
