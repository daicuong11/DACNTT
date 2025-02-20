using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhoneStoreBackend.Migrations
{
    public partial class initDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    BrandId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.BrandId);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    DiscountId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Percentage = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.DiscountId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfilePicture = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    IsGoogleAccount = table.Column<bool>(type: "bit", nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshTokenExpiryTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    BrandId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_Products_Brands_BrandId",
                        column: x => x.BrandId,
                        principalTable: "Brands",
                        principalColumn: "BrandId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductSpecificationGroups",
                columns: table => new
                {
                    ProductSpecificationGroupId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSpecificationGroups", x => x.ProductSpecificationGroupId);
                    table.ForeignKey(
                        name: "FK_ProductSpecificationGroups_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId");
                });

            migrationBuilder.CreateTable(
                name: "ActivityLogs",
                columns: table => new
                {
                    LogId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Action = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityLogs", x => x.LogId);
                    table.ForeignKey(
                        name: "FK_ActivityLogs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    AddressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Province = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    District = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Ward = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.AddressId);
                    table.ForeignKey(
                        name: "FK_Addresses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    CartId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => x.CartId);
                    table.ForeignKey(
                        name: "FK_Carts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Coupons",
                columns: table => new
                {
                    CouponId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsPercentage = table.Column<bool>(type: "bit", nullable: false),
                    DiscountValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MinimumOrderAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MaxUsageCount = table.Column<int>(type: "int", nullable: true),
                    UsedCount = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coupons", x => x.CouponId);
                    table.ForeignKey(
                        name: "FK_Coupons_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    NotificationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id = table.Column<int>(type: "int", nullable: false),
                    SenderId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Message = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    IsRead = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.NotificationId);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Wishlists",
                columns: table => new
                {
                    WishlistId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wishlists", x => x.WishlistId);
                    table.ForeignKey(
                        name: "FK_Wishlists_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductVariants",
                columns: table => new
                {
                    ProductVariantId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    DiscountId = table.Column<int>(type: "int", nullable: true),
                    VariantName = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Slug = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Storage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    ImportPrice = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Stock = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductVariants", x => x.ProductVariantId);
                    table.ForeignKey(
                        name: "FK_ProductVariants_Discounts_DiscountId",
                        column: x => x.DiscountId,
                        principalTable: "Discounts",
                        principalColumn: "DiscountId");
                    table.ForeignKey(
                        name: "FK_ProductVariants_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CartItems",
                columns: table => new
                {
                    CartItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CartId = table.Column<int>(type: "int", nullable: false),
                    ProductVariantId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartItems", x => x.CartItemId);
                    table.ForeignKey(
                        name: "FK_CartItems_Carts_CartId",
                        column: x => x.CartId,
                        principalTable: "Carts",
                        principalColumn: "CartId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartItems_ProductVariants_ProductVariantId",
                        column: x => x.ProductVariantId,
                        principalTable: "ProductVariants",
                        principalColumn: "ProductVariantId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductImages",
                columns: table => new
                {
                    ImageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductVariantId = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsMain = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductImages", x => x.ImageId);
                    table.ForeignKey(
                        name: "FK_ProductImages_ProductVariants_ProductVariantId",
                        column: x => x.ProductVariantId,
                        principalTable: "ProductVariants",
                        principalColumn: "ProductVariantId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductSpecifications",
                columns: table => new
                {
                    SpecificationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductSpecificationGroupId = table.Column<int>(type: "int", nullable: false),
                    ProductVariantId = table.Column<int>(type: "int", nullable: false),
                    Key = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    IsSpecial = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSpecifications", x => x.SpecificationId);
                    table.ForeignKey(
                        name: "FK_ProductSpecifications_ProductSpecificationGroups_ProductSpecificationGroupId",
                        column: x => x.ProductSpecificationGroupId,
                        principalTable: "ProductSpecificationGroups",
                        principalColumn: "ProductSpecificationGroupId");
                    table.ForeignKey(
                        name: "FK_ProductSpecifications_ProductVariants_ProductVariantId",
                        column: x => x.ProductVariantId,
                        principalTable: "ProductVariants",
                        principalColumn: "ProductVariantId");
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    ReviewId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductVariantId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.ReviewId);
                    table.ForeignKey(
                        name: "FK_Reviews_ProductVariants_ProductVariantId",
                        column: x => x.ProductVariantId,
                        principalTable: "ProductVariants",
                        principalColumn: "ProductVariantId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WishlistItems",
                columns: table => new
                {
                    WishlistItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WishlistId = table.Column<int>(type: "int", nullable: false),
                    ProductVariantId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WishlistItems", x => x.WishlistItemId);
                    table.ForeignKey(
                        name: "FK_WishlistItems_ProductVariants_ProductVariantId",
                        column: x => x.ProductVariantId,
                        principalTable: "ProductVariants",
                        principalColumn: "ProductVariantId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WishlistItems_Wishlists_WishlistId",
                        column: x => x.WishlistId,
                        principalTable: "Wishlists",
                        principalColumn: "WishlistId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    CustomerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.CustomerId);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CouponId = table.Column<int>(type: "int", nullable: true),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    ShippingFee = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ShippingAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Orders_Coupons_CouponId",
                        column: x => x.CouponId,
                        principalTable: "Coupons",
                        principalColumn: "CouponId");
                    table.ForeignKey(
                        name: "FK_Orders_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "CustomerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetails",
                columns: table => new
                {
                    OrderDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ProductVariantId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetails", x => x.OrderDetailId);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetails_ProductVariants_ProductVariantId",
                        column: x => x.ProductVariantId,
                        principalTable: "ProductVariants",
                        principalColumn: "ProductVariantId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    PaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    PaymentMethod = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    PaymentStatus = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.PaymentId);
                    table.ForeignKey(
                        name: "FK_Payments_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Brands",
                columns: new[] { "BrandId", "Description", "ImageUrl", "Name" },
                values: new object[,]
                {
                    { 1, "Thương hiệu cao cấp với iPhone, iPad, MacBook và phụ kiện", "https://example.com/images/apple.jpg", "Apple" },
                    { 2, "Hãng công nghệ hàng đầu với điện thoại Galaxy, máy tính bảng và TV", "https://example.com/images/samsung.jpg", "Samsung" },
                    { 3, "Thương hiệu giá rẻ với các sản phẩm điện thoại, tai nghe và thiết bị thông minh", "https://example.com/images/xiaomi.jpg", "Xiaomi" },
                    { 4, "Chuyên về điện thoại chụp ảnh đẹp và công nghệ sạc nhanh", "https://example.com/images/oppo.jpg", "Oppo" },
                    { 5, "Tập trung vào trải nghiệm âm thanh và camera cho điện thoại", "https://example.com/images/vivo.jpg", "Vivo" },
                    { 6, "Thương hiệu con của Oppo với thiết bị giá rẻ nhưng mạnh mẽ", "https://example.com/images/realme.jpg", "Realme" },
                    { 7, "Điện thoại cao cấp với hiệu năng mạnh và phần mềm mượt mà", "https://example.com/images/oneplus.jpg", "OnePlus" },
                    { 8, "Chuyên về tai nghe, máy ảnh, loa và điện thoại Xperia", "https://example.com/images/sony.jpg", "Sony" },
                    { 9, "Điện thoại bền bỉ với pin lâu và hệ điều hành Android gốc", "https://example.com/images/nokia.jpg", "Nokia" },
                    { 10, "Nổi bật với dòng ROG Phone cho game thủ và laptop mạnh mẽ", "https://example.com/images/asus.jpg", "Asus" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "Description", "ImageUrl", "Name" },
                values: new object[,]
                {
                    { 1, "Các mẫu điện thoại mới nhất và phổ biến", "https://example.com/images/smartphones.jpg", "Điện thoại" },
                    { 2, "Hiệu suất cao cho công việc và giải trí", "https://example.com/images/tablets.jpg", "Máy tính bảng" },
                    { 3, "Laptop mạnh mẽ đáp ứng mọi nhu cầu", "https://example.com/images/laptops.jpg", "Laptop" },
                    { 4, "Những phụ kiện thiết yếu cho thiết bị của bạn", "https://example.com/images/accessories.jpg", "Phụ kiện" },
                    { 5, "Luôn kết nối với đồng hồ thông minh mới nhất", "https://example.com/images/smartwatches.jpg", "Đồng hồ thông minh" },
                    { 6, "Trải nghiệm âm thanh chất lượng cao", "https://example.com/images/headphones.jpg", "Tai nghe" },
                    { 7, "Sạc nhanh và đáng tin cậy cho thiết bị của bạn", "https://example.com/images/chargers.jpg", "Sạc điện thoại" },
                    { 8, "Bảo vệ thiết bị với ốp lưng thời trang", "https://example.com/images/cases.jpg", "Ốp lưng & Bao da" },
                    { 9, "Loa Bluetooth di động và mạnh mẽ", "https://example.com/images/speakers.jpg", "Loa" },
                    { 10, "Mở rộng dung lượng lưu trữ với thẻ nhớ tốc độ cao", "https://example.com/images/memorycards.jpg", "Thẻ nhớ" }
                });

            migrationBuilder.InsertData(
                table: "Discounts",
                columns: new[] { "DiscountId", "EndDate", "IsActive", "Percentage", "StartDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), true, 10m, new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, new DateTime(2025, 3, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), true, 15m, new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, new DateTime(2025, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), false, 20m, new DateTime(2025, 2, 25, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, new DateTime(2025, 4, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), true, 5m, new DateTime(2025, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, new DateTime(2025, 2, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), false, 25m, new DateTime(2025, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 6, new DateTime(2025, 3, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), true, 30m, new DateTime(2025, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 7, new DateTime(2025, 3, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), true, 12m, new DateTime(2025, 2, 28, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 8, new DateTime(2025, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), true, 18m, new DateTime(2025, 3, 15, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 9, new DateTime(2025, 4, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), true, 22m, new DateTime(2025, 4, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 10, new DateTime(2025, 3, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), true, 8m, new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "ProductSpecificationGroups",
                columns: new[] { "ProductSpecificationGroupId", "CategoryId", "DisplayOrder", "GroupName" },
                values: new object[,]
                {
                    { 1, 1, 1, "Thiết kế & Màn hình" },
                    { 2, 1, 2, "Hiệu năng & Bộ nhớ" },
                    { 3, 1, 3, "Camera" },
                    { 4, 1, 4, "Pin & Sạc" },
                    { 5, 1, 5, "Kết nối & Cảm biến" },
                    { 6, 1, 6, "Hệ điều hành & Giao diện" },
                    { 7, 1, 7, "Âm thanh" },
                    { 8, 1, 8, "Phụ kiện đi kèm" },
                    { 9, 2, 1, "Màn hình" },
                    { 10, 2, 2, "Hiệu năng & Bộ nhớ" },
                    { 11, 2, 3, "Camera & Hỗ trợ bút" },
                    { 12, 2, 4, "Pin & Sạc" },
                    { 13, 2, 5, "Hệ điều hành & Kết nối" },
                    { 14, 3, 1, "Thiết kế & Màn hình" },
                    { 15, 3, 2, "Hiệu năng & Tản nhiệt" },
                    { 16, 3, 3, "Bàn phím & Touchpad" },
                    { 17, 3, 4, "Pin & Cổng kết nối" },
                    { 18, 3, 5, "Hệ điều hành & Phần mềm" },
                    { 19, 4, 1, "Màn hình & Chất lượng âm thanh" },
                    { 20, 4, 2, "Hiệu suất & Đồ họa" },
                    { 21, 4, 3, "Pin & Thời gian sử dụng" },
                    { 22, 4, 4, "Hệ điều hành & Ứng dụng" },
                    { 23, 5, 1, "Tính năng & Công nghệ" },
                    { 24, 5, 2, "Màn hình & Hiển thị" },
                    { 25, 5, 3, "Thời lượng pin & Sạc" },
                    { 26, 5, 4, "Kết nối & Tiện ích" },
                    { 27, 6, 1, "Tính năng & Công nghệ" },
                    { 28, 6, 2, "Thời lượng pin & Sạc" },
                    { 29, 6, 3, "Thiết kế & Khả năng chống ồn" },
                    { 30, 6, 4, "Kết nối & Điều khiển" },
                    { 31, 7, 1, "Kích thước & Trọng lượng" },
                    { 32, 7, 2, "Công nghệ hiển thị" },
                    { 33, 7, 3, "Hệ điều hành & Ứng dụng" },
                    { 34, 7, 4, "Kết nối & Tiện ích" },
                    { 35, 8, 1, "Hiệu suất & Lưu trữ" },
                    { 36, 8, 2, "Kết nối & Cảm biến" },
                    { 37, 8, 3, "Tính năng thông minh" },
                    { 38, 8, 4, "Độ bền & Chống nước" },
                    { 39, 9, 1, "Dung lượng & Chuẩn tốc độ" },
                    { 40, 9, 2, "Kết nối & Bảo mật" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "BrandId", "CategoryId", "Description", "Name" },
                values: new object[,]
                {
                    { 1, 1, 1, "<p><strong>Chip A17 Pro</strong> với hiệu suất vượt trội và camera 48MP.</p>", "iPhone 15 Pro Max" },
                    { 2, 1, 1, "<p>Màn hình <strong>6.1 inch</strong> Super Retina XDR, chip A17 Pro.</p>", "iPhone 15 Pro" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "BrandId", "CategoryId", "Description", "Name" },
                values: new object[,]
                {
                    { 3, 1, 1, "<p>Thiết kế khung nhôm, camera 48MP, chip A16 Bionic.</p>", "iPhone 15" },
                    { 4, 1, 1, "<p><strong>Dynamic Island</strong>, camera 48MP, chip A16 Bionic.</p>", "iPhone 14 Pro Max" },
                    { 5, 1, 1, "<p>Màn hình LTPO 120Hz, Always-On Display, camera nâng cấp.</p>", "iPhone 14 Pro" },
                    { 6, 1, 1, "<p>Chip A15 Bionic, thiết kế bền bỉ, camera kép 12MP.</p>", "iPhone 14" },
                    { 7, 1, 1, "<p>Hiệu suất mạnh mẽ với A15 Bionic, camera ProMotion 120Hz.</p>", "iPhone 13 Pro Max" },
                    { 8, 1, 1, "<p>Khung thép không gỉ, camera tele 3x, pin lâu.</p>", "iPhone 13 Pro" },
                    { 9, 1, 1, "<p>Chip A15, camera kép với Night Mode, màn hình OLED.</p>", "iPhone 13" },
                    { 10, 1, 1, "<p>Chip A15, Touch ID, thiết kế nhỏ gọn, giá phải chăng.</p>", "iPhone SE 2022" },
                    { 11, 2, 1, "<p>Camera 200MP, chip Snapdragon 8 Gen 3, bút S-Pen.</p>", "Samsung Galaxy S24 Ultra" },
                    { 12, 3, 1, "<p>Hợp tác với Leica, camera 1 inch, Snapdragon 8 Gen 2.</p>", "Xiaomi 13 Pro" },
                    { 13, 4, 1, "<p>Màn hình AMOLED 120Hz, camera zoom 100x.</p>", "Oppo Find X6 Pro" },
                    { 14, 5, 1, "<p>Camera ZEISS, chip Dimensity 9200, màn hình cong.</p>", "Vivo X90 Pro" },
                    { 15, 6, 1, "<p>Sạc nhanh 240W, màn hình AMOLED 144Hz.</p>", "Realme GT Neo 5" },
                    { 16, 7, 1, "<p>Hiệu năng cao với OxygenOS, Snapdragon 8 Gen 2.</p>", "OnePlus 11 5G" },
                    { 17, 8, 1, "<p>Màn hình OLED 4K, camera chuyên nghiệp.</p>", "Sony Xperia 1 V" },
                    { 18, 9, 1, "<p>Điện thoại siêu bền đạt chuẩn quân đội MIL-STD-810H.</p>", "Nokia XR21" },
                    { 19, 10, 1, "<p>Điện thoại gaming với màn hình 165Hz và Snapdragon 8 Gen 2.</p>", "Asus ROG Phone 7" },
                    { 20, 1, 2, "<p>Chip M2, màn hình Liquid Retina XDR, bút Apple Pencil.</p>", "Apple iPad Pro 12.9" },
                    { 21, 1, 6, "Tai nghe không dây chống ồn tốt nhất của Apple", "Apple AirPods Pro 2" },
                    { 22, 2, 5, "Đồng hồ thông minh với màn hình Super AMOLED", "Samsung Galaxy Watch 6" },
                    { 23, 3, 2, "Máy tính bảng với Snapdragon 8+ Gen 1", "Xiaomi Pad 6 Pro" },
                    { 24, 10, 3, "Laptop gaming giá tốt với RTX 4060", "Asus TUF Gaming F15" },
                    { 25, 1, 3, "Laptop mạnh mẽ cho dân thiết kế và lập trình viên", "MacBook Pro M3 Max" },
                    { 26, 8, 1, "Điện thoại flagship với màn hình 4K OLED", "Sony Xperia 1 V" },
                    { 27, 9, 1, "Điện thoại siêu bền chuẩn quân đội", "Nokia XR21" },
                    { 28, 4, 1, "Điện thoại chụp ảnh zoom ấn tượng", "Oppo Reno 10 Pro+" },
                    { 29, 6, 1, "Điện thoại giá rẻ với camera 200MP", "Realme 11 Pro+" },
                    { 30, 7, 1, "Điện thoại tầm trung với hiệu năng mạnh", "OnePlus Nord 3" },
                    { 31, 1, 4, "Bàn phím không dây dành cho iPad", "Apple Magic Keyboard" },
                    { 32, 2, 7, "Smart TV 8K với công nghệ Mini LED", "Samsung 65\" Neo QLED 8K" },
                    { 33, 3, 8, "Thiết bị lọc không khí thông minh", "Xiaomi Smart Air Purifier 4" },
                    { 34, 10, 3, "Laptop màn hình kép sáng tạo", "Asus ZenBook Duo 14" },
                    { 35, 8, 8, "Console chơi game thế hệ mới", "Sony PlayStation 5" },
                    { 36, 4, 2, "Máy tính bảng giá rẻ với Snapdragon 680", "Oppo Pad Air" },
                    { 37, 5, 1, "Điện thoại có camera chụp chân dung đẹp", "Vivo V29 Pro" },
                    { 38, 1, 9, "Loa thông minh với Siri", "Apple HomePod Mini" },
                    { 39, 2, 10, "Ổ cứng di động tốc độ cao", "Samsung T7 Shield SSD" },
                    { 40, 3, 5, "Vòng đeo tay thông minh theo dõi sức khỏe", "Xiaomi Mi Band 8" }
                });

            migrationBuilder.InsertData(
                table: "ProductVariants",
                columns: new[] { "ProductVariantId", "Color", "DiscountId", "ImportPrice", "Price", "ProductId", "Slug", "Stock", "Storage", "VariantName" },
                values: new object[,]
                {
                    { 1, "Black Titanium", 1, 30990000m, 33990000m, 1, "iphone-15-pro-max-256gb", 50, "256GB", "iPhone 15 Pro Max 256GB" },
                    { 2, "Blue Titanium", 2, 36990000m, 39990000m, 1, "iphone-15-pro-max-512gb", 40, "512GB", "iPhone 15 Pro Max 512GB" },
                    { 3, "Natural Titanium", 3, 25990000m, 28990000m, 2, "iphone-15-pro-128gb", 50, "128GB", "iPhone 15 Pro 128GB" },
                    { 4, "White Titanium", 4, 28990000m, 31990000m, 2, "iphone-15-pro-256gb", 30, "256GB", "iPhone 15 Pro 256GB" },
                    { 5, "Pink", 5, 19990000m, 21990000m, 3, "iphone-15-128gb", 50, "128GB", "iPhone 15 128GB" },
                    { 6, "Yellow", 6, 22990000m, 24990000m, 3, "iphone-15-256gb", 45, "256GB", "iPhone 15 256GB" },
                    { 7, "Deep Purple", 7, 23990000m, 26990000m, 4, "iphone-14-pro-max-128gb", 40, "128GB", "iPhone 14 Pro Max 128GB" },
                    { 8, "Gold", 8, 26990000m, 29990000m, 4, "iphone-14-pro-max-256gb", 35, "256GB", "iPhone 14 Pro Max 256GB" },
                    { 9, "Silver", 9, 20990000m, 23990000m, 5, "iphone-14-pro-128gb", 50, "128GB", "iPhone 14 Pro 128GB" },
                    { 10, "Space Black", 10, 23990000m, 26990000m, 5, "iphone-14-pro-256gb", 30, "256GB", "iPhone 14 Pro 256GB" },
                    { 11, "Blue", 1, 16990000m, 18990000m, 6, "iphone-14-128gb", 60, "128GB", "iPhone 14 128GB" },
                    { 12, "Midnight", 2, 19990000m, 21990000m, 6, "iphone-14-256gb", 50, "256GB", "iPhone 14 256GB" },
                    { 13, "Graphite", 3, 18990000m, 20990000m, 7, "iphone-13-pro-max-128gb", 40, "128GB", "iPhone 13 Pro Max 128GB" },
                    { 14, "Sierra Blue", 4, 16990000m, 18990000m, 8, "iphone-13-pro-128gb", 35, "128GB", "iPhone 13 Pro 128GB" },
                    { 15, "Starlight", 5, 12990000m, 14990000m, 9, "iphone-13-128gb", 55, "128GB", "iPhone 13 128GB" },
                    { 16, "Product Red", 6, 9990000m, 10990000m, 10, "iphone-se-2022-64gb", 70, "64GB", "iPhone SE 2022 64GB" },
                    { 17, "Titanium Gray", 7, 28990000m, 31990000m, 11, "samsung-galaxy-s24-ultra-256gb", 45, "256GB", "Samsung Galaxy S24 Ultra 256GB" },
                    { 18, "Space Gray", 8, 27990000m, 30990000m, 20, "apple-ipad-pro-12-9-m2-128gb", 40, "128GB", "Apple iPad Pro 12.9 M2 128GB" },
                    { 19, "White", 9, 5990000m, 6990000m, 21, "apple-airpods-pro-2", 100, "NA", "Apple AirPods Pro 2" },
                    { 20, "Graphite", 10, 6990000m, 7990000m, 22, "samsung-galaxy-watch-6", 80, "NA", "Samsung Galaxy Watch 6" },
                    { 21, "Ceramic White", 1, 20990000m, 22990000m, 12, "xiaomi-13-pro-256gb", 40, "256GB", "Xiaomi 13 Pro 256GB" },
                    { 22, "Ceramic Black", 2, 23990000m, 25990000m, 12, "xiaomi-13-pro-512gb", 30, "512GB", "Xiaomi 13 Pro 512GB" },
                    { 23, "Black", 3, 18990000m, 20990000m, 13, "oppo-find-x6-pro-256gb", 35, "256GB", "Oppo Find X6 Pro 256GB" },
                    { 24, "Green", 4, 21990000m, 23990000m, 13, "oppo-find-x6-pro-512gb", 25, "512GB", "Oppo Find X6 Pro 512GB" },
                    { 25, "Legend Black", 5, 17990000m, 19990000m, 14, "vivo-x90-pro-256gb", 45, "256GB", "Vivo X90 Pro 256GB" },
                    { 26, "Red", 6, 20990000m, 22990000m, 14, "vivo-x90-pro-512gb", 35, "512GB", "Vivo X90 Pro 512GB" },
                    { 27, "Purple", 7, 13990000m, 15990000m, 15, "realme-gt-neo-5-256gb", 50, "256GB", "Realme GT Neo 5 256GB" },
                    { 28, "Black", 8, 16990000m, 18990000m, 15, "realme-gt-neo-5-512gb", 40, "512GB", "Realme GT Neo 5 512GB" },
                    { 29, "Green", 9, 18990000m, 20990000m, 16, "oneplus-11-5g-256gb", 30, "256GB", "OnePlus 11 5G 256GB" },
                    { 30, "Black", 10, 21990000m, 23990000m, 16, "oneplus-11-5g-512gb", 20, "512GB", "OnePlus 11 5G 512GB" },
                    { 31, "Purple", 1, 26990000m, 28990000m, 17, "sony-xperia-1-v-256gb", 25, "256GB", "Sony Xperia 1 V 256GB" },
                    { 32, "Black", 2, 29990000m, 31990000m, 17, "sony-xperia-1-v-512gb", 15, "512GB", "Sony Xperia 1 V 512GB" },
                    { 33, "Black", 3, 9990000m, 11990000m, 18, "nokia-xr21-128gb", 60, "128GB", "Nokia XR21 128GB" },
                    { 34, "Green", 4, 11990000m, 13990000m, 18, "nokia-xr21-256gb", 50, "256GB", "Nokia XR21 256GB" },
                    { 35, "Storm White", 5, 23990000m, 25990000m, 19, "asus-rog-phone-7-256gb", 35, "256GB", "Asus ROG Phone 7 256GB" },
                    { 36, "Phantom Black", 6, 26990000m, 28990000m, 19, "asus-rog-phone-7-512gb", 25, "512GB", "Asus ROG Phone 7 512GB" },
                    { 37, "Blue", 7, 8990000m, 10990000m, 23, "xiaomi-pad-6-pro-128gb", 45, "128GB", "Xiaomi Pad 6 Pro 128GB" },
                    { 38, "Silver", 8, 10990000m, 12990000m, 23, "xiaomi-pad-6-pro-256gb", 40, "256GB", "Xiaomi Pad 6 Pro 256GB" },
                    { 39, "Black", 9, 26990000m, 28990000m, 24, "asus-tuf-gaming-f15-i7-rtx4060", 30, "1TB SSD", "Asus TUF Gaming F15 i7-RTX 4060" },
                    { 40, "Gray", 10, 32990000m, 34990000m, 24, "asus-tuf-gaming-f15-i9-rtx4070", 20, "1TB SSD", "Asus TUF Gaming F15 i9-RTX 4070" },
                    { 41, "Space Gray", 1, 62990000m, 64990000m, 25, "macbook-pro-m3-max-14", 25, "1TB SSD", "MacBook Pro M3 Max 14-inch" },
                    { 42, "Silver", 2, 77990000m, 79990000m, 25, "macbook-pro-m3-max-16", 15, "2TB SSD", "MacBook Pro M3 Max 16-inch" }
                });

            migrationBuilder.InsertData(
                table: "ProductVariants",
                columns: new[] { "ProductVariantId", "Color", "DiscountId", "ImportPrice", "Price", "ProductId", "Slug", "Stock", "Storage", "VariantName" },
                values: new object[,]
                {
                    { 43, "Gray", 3, 24990000m, 26990000m, 26, "sony-xperia-1-v-128gb", 30, "128GB", "Sony Xperia 1 V 128GB" },
                    { 44, "Blue", 4, 7990000m, 9990000m, 27, "nokia-xr21-64gb", 60, "64GB", "Nokia XR21 64GB" },
                    { 45, "Black", 5, 12990000m, 14990000m, 28, "oppo-reno-10-pro-plus-256gb", 50, "256GB", "Oppo Reno 10 Pro+ 256GB" },
                    { 46, "Gold", 6, 15990000m, 17990000m, 28, "oppo-reno-10-pro-plus-512gb", 40, "512GB", "Oppo Reno 10 Pro+ 512GB" },
                    { 47, "Blue", 7, 8990000m, 10990000m, 29, "realme-11-pro-plus-128gb", 55, "128GB", "Realme 11 Pro+ 128GB" },
                    { 48, "Green", 8, 10990000m, 12990000m, 29, "realme-11-pro-plus-256gb", 45, "256GB", "Realme 11 Pro+ 256GB" },
                    { 49, "Black", 9, 9990000m, 11990000m, 30, "oneplus-nord-3-128gb", 50, "128GB", "OnePlus Nord 3 128GB" },
                    { 50, "Blue", 10, 11990000m, 13990000m, 30, "oneplus-nord-3-256gb", 40, "256GB", "OnePlus Nord 3 256GB" }
                });

            migrationBuilder.InsertData(
                table: "ProductImages",
                columns: new[] { "ImageId", "ImageUrl", "IsMain", "ProductVariantId" },
                values: new object[,]
                {
                    { 1, "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png", true, 1 },
                    { 2, "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4__1.jpg", false, 1 },
                    { 3, "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_5__1.jpg", false, 1 },
                    { 4, "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_6__1.jpg", false, 1 },
                    { 5, "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_7__1.jpg", false, 1 },
                    { 6, "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_8__1.jpg", false, 1 },
                    { 7, "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_9__1.jpg", false, 1 },
                    { 8, "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_1__1.jpg", false, 1 },
                    { 9, "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_10__1.jpg", false, 1 }
                });

            migrationBuilder.InsertData(
                table: "ProductSpecifications",
                columns: new[] { "SpecificationId", "DisplayOrder", "IsSpecial", "Key", "ProductSpecificationGroupId", "ProductVariantId", "Value" },
                values: new object[,]
                {
                    { 1, 1, true, "Màn hình", 1, 1, "6.7 inch Super Retina XDR" },
                    { 2, 2, false, "Chất liệu khung", 1, 1, "Titanium" },
                    { 3, 1, true, "Chip xử lý", 2, 1, "Apple A17 Pro" },
                    { 4, 2, false, "RAM", 2, 1, "8GB" },
                    { 5, 1, true, "Camera chính", 3, 1, "48MP" },
                    { 6, 2, false, "Camera tele", 3, 1, "12MP 5X zoom quang học" },
                    { 7, 1, false, "Dung lượng pin", 4, 1, "4422mAh" },
                    { 8, 2, false, "Sạc nhanh", 4, 1, "20W" },
                    { 9, 1, true, "Kết nối", 5, 1, "5G" },
                    { 10, 2, false, "Cổng sạc", 5, 1, "USB-C" },
                    { 11, 1, true, "Màn hình", 1, 2, "6.7 inch Super Retina XDR" },
                    { 12, 2, false, "Chất liệu khung", 1, 2, "Titanium" },
                    { 13, 1, true, "Chip xử lý", 2, 2, "Apple A17 Pro" },
                    { 14, 2, false, "RAM", 2, 2, "8GB" },
                    { 15, 1, true, "Camera chính", 3, 2, "48MP" },
                    { 16, 2, false, "Camera tele", 3, 2, "12MP 5X zoom quang học" },
                    { 17, 1, false, "Dung lượng pin", 4, 2, "4422mAh" },
                    { 18, 2, false, "Sạc nhanh", 4, 2, "20W" },
                    { 19, 1, true, "Kết nối", 5, 2, "5G" },
                    { 20, 2, false, "Cổng sạc", 5, 2, "USB-C" },
                    { 21, 1, true, "Màn hình", 1, 3, "6.1 inch Super Retina XDR" },
                    { 22, 2, false, "Chất liệu khung", 1, 3, "Titanium" },
                    { 23, 1, true, "Chip xử lý", 2, 3, "Apple A17 Pro" },
                    { 24, 2, false, "RAM", 2, 3, "8GB" },
                    { 25, 1, true, "Camera chính", 3, 3, "48MP" },
                    { 26, 2, false, "Camera tele", 3, 3, "12MP 3X zoom quang học" },
                    { 27, 1, false, "Dung lượng pin", 4, 3, "3274mAh" },
                    { 28, 2, false, "Sạc nhanh", 4, 3, "20W" },
                    { 29, 1, true, "Kết nối", 5, 3, "5G" },
                    { 30, 2, false, "Cổng sạc", 5, 3, "USB-C" },
                    { 31, 1, true, "Màn hình", 1, 5, "6.1 inch Super Retina XDR" },
                    { 32, 2, false, "Chất liệu khung", 1, 5, "Nhôm" },
                    { 33, 1, true, "Chip xử lý", 2, 5, "Apple A16 Bionic" }
                });

            migrationBuilder.InsertData(
                table: "ProductSpecifications",
                columns: new[] { "SpecificationId", "DisplayOrder", "IsSpecial", "Key", "ProductSpecificationGroupId", "ProductVariantId", "Value" },
                values: new object[,]
                {
                    { 34, 2, false, "RAM", 2, 5, "6GB" },
                    { 35, 1, true, "Camera chính", 3, 5, "48MP" },
                    { 36, 2, false, "Camera tele", 3, 5, "Không có" },
                    { 37, 1, false, "Dung lượng pin", 4, 5, "3349mAh" },
                    { 38, 2, false, "Sạc nhanh", 4, 5, "20W" },
                    { 39, 1, true, "Kết nối", 5, 5, "5G" },
                    { 40, 2, false, "Cổng sạc", 5, 5, "USB-C" },
                    { 41, 1, true, "Màn hình", 1, 11, "6.1 inch Super Retina XDR" },
                    { 42, 2, false, "Chất liệu khung", 1, 11, "Nhôm" },
                    { 43, 1, true, "Chip xử lý", 2, 11, "Apple A15 Bionic" },
                    { 44, 2, false, "RAM", 2, 11, "6GB" },
                    { 45, 1, true, "Camera chính", 3, 11, "12MP" },
                    { 46, 2, false, "Camera tele", 3, 11, "Không có" },
                    { 47, 1, false, "Dung lượng pin", 4, 11, "3279mAh" },
                    { 48, 2, false, "Sạc nhanh", 4, 11, "20W" },
                    { 49, 1, true, "Kết nối", 5, 11, "5G" },
                    { 50, 2, false, "Cổng sạc", 5, 11, "Lightning" },
                    { 51, 1, true, "Màn hình", 1, 16, "4.7 inch Retina HD" },
                    { 52, 2, false, "Chất liệu khung", 1, 16, "Nhôm" },
                    { 53, 1, true, "Chip xử lý", 2, 16, "Apple A15 Bionic" },
                    { 54, 2, false, "RAM", 2, 16, "4GB" },
                    { 55, 1, true, "Camera chính", 3, 16, "12MP" },
                    { 56, 2, false, "Camera tele", 3, 16, "Không có" },
                    { 57, 1, false, "Dung lượng pin", 4, 16, "2018mAh" },
                    { 58, 2, false, "Sạc nhanh", 4, 16, "18W" },
                    { 59, 1, true, "Kết nối", 5, 16, "5G" },
                    { 60, 2, false, "Cổng sạc", 5, 16, "Lightning" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActivityLogs_UserId",
                table: "ActivityLogs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_UserId",
                table: "Addresses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_CartId",
                table: "CartItems",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_ProductVariantId",
                table: "CartItems",
                column: "ProductVariantId");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_UserId",
                table: "Carts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_UserId",
                table: "Coupons",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_OrderId",
                table: "Customers",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_Id",
                table: "Notifications",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_SenderId",
                table: "Notifications",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_OrderId",
                table: "OrderDetails",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_ProductVariantId",
                table: "OrderDetails",
                column: "ProductVariantId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CouponId",
                table: "Orders",
                column: "CouponId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerId",
                table: "Orders",
                column: "CustomerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_OrderId",
                table: "Payments",
                column: "OrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductImages_ProductVariantId",
                table: "ProductImages",
                column: "ProductVariantId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_BrandId",
                table: "Products",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSpecificationGroups_CategoryId",
                table: "ProductSpecificationGroups",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSpecifications_ProductSpecificationGroupId",
                table: "ProductSpecifications",
                column: "ProductSpecificationGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSpecifications_ProductVariantId",
                table: "ProductSpecifications",
                column: "ProductVariantId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductVariants_DiscountId",
                table: "ProductVariants",
                column: "DiscountId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductVariants_ProductId",
                table: "ProductVariants",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ProductVariantId",
                table: "Reviews",
                column: "ProductVariantId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserId",
                table: "Reviews",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WishlistItems_ProductVariantId",
                table: "WishlistItems",
                column: "ProductVariantId");

            migrationBuilder.CreateIndex(
                name: "IX_WishlistItems_WishlistId",
                table: "WishlistItems",
                column: "WishlistId");

            migrationBuilder.CreateIndex(
                name: "IX_Wishlists_UserId",
                table: "Wishlists",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Orders_OrderId",
                table: "Customers",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_Users_UserId",
                table: "Coupons");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Orders_OrderId",
                table: "Customers");

            migrationBuilder.DropTable(
                name: "ActivityLogs");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "CartItems");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "OrderDetails");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "ProductImages");

            migrationBuilder.DropTable(
                name: "ProductSpecifications");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "WishlistItems");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "ProductSpecificationGroups");

            migrationBuilder.DropTable(
                name: "ProductVariants");

            migrationBuilder.DropTable(
                name: "Wishlists");

            migrationBuilder.DropTable(
                name: "Discounts");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Coupons");

            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}
