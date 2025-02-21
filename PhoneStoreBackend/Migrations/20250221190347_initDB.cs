using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhoneStoreBackend.Migrations
{
    public partial class initdb : Migration
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
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                table: "Users",
                columns: new[] { "Id", "Active", "Address", "CreatedAt", "Email", "IsGoogleAccount", "Name", "Password", "PhoneNumber", "ProfilePicture", "RefreshToken", "RefreshTokenExpiryTime", "Role", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, true, "19 Nguyễn Hữu Thọ, Tân Hưng, Quận 7, Hồ Chí Minh", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "admin@gmail.com", false, "Bui Yen", "$2a$12$juvYYD0Il0DgOQ/q4hMZJOrZM1N9wbYZDC0Zxc4KaIHBQHrGEDSom", "0123456789", "https://compote.slate.com/images/01a4c27f-044a-489e-a891-69480c85f4db.jpeg", "", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "ADMIN", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, true, "19 Nguyễn Hữu Thọ, Tân Hưng, Quận 7, Hồ Chí Minh", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "vanbien.dev@gmail.com", true, "Nguyễn Văn Biên", "$2a$12$1rlhso2Ea6jad1wwL897nO/IhrzxoxYN99rgEzThVcekphPCW4dz2", "0987654321", "https://m.media-amazon.com/images/I/71QKVtKTbdL._AC_SL1500_.jpg", "token123", new DateTime(2025, 3, 1, 12, 0, 0, 0, DateTimeKind.Unspecified), "CUSTOMER", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, false, "19 Nguyễn Hữu Thọ, Tân Hưng, Quận 7, Hồ Chí Minh", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "cuong@gmail.com", false, "Lý Đại Cương", "$2a$12$IoHaeCHxfI2JsWMYPtVPB.Y8xmh1dKRIwWPu1DVEtPRLfNJRqdnES", "0345678901", "https://static.independent.co.uk/2022/03/08/21/newFile-1.jpg", "", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "EMPLOYEE", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, true, "19 Nguyễn Hữu Thọ, Tân Hưng, Quận 7, Hồ Chí Minh", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "hung@gmail.com", false, "Đạo Thanh Hưng", "$2a$12$VygkNWltkROlEb2TNW6qM.Y.OnaMQAYY9nTFfeM/ZgQmRXn.3bSSy", "0543216789", "https://compote.slate.com/images/01a4c27f-044a-489e-a891-69480c85f4db.jpeg", "", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "CUSTOMER", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, true, "33 Phạm Ngũ Lão", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "hoang.do@gmail.com", true, "Đỗ Văn Hoàng", "$2a$12$Dlg/m09cP33cyAV3hhkbQeS8HkVlyYD1twTLVqgfsq.MsgwMzVeNy", "0654321987", "profile5.jpg", "token456", new DateTime(2025, 4, 10, 12, 0, 0, 0, DateTimeKind.Unspecified), "EMPLOYEE", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 6, true, "55 Bà Triệu", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "lan.hoang@gmail.com", false, "Hoàng Thị Lan", "$2a$12$b0e2caNCEMNdkeO67.IodOj/hfxmV/NwN6quBl3FBejmxFuDqcjIW", "0789456123", "profile6.jpg", "", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "ADMIN", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 7, false, "67 Điện Biên Phủ", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "bao.vo@gmail.com", false, "Võ Quốc Bảo", "$2a$12$tVJR6jcbmnFnZt5T93WyJeVq/6h53H32rQbYS1j1p/L5RSIclkqCG", "0896543210", "profile7.jpg", "", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "EMPLOYEE", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 8, true, "99 Lý Thường Kiệt", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "hang.ngo@gmail.com", true, "Ngô Thanh Hằng", "$2a$12$siSeKKVYuy9ZVU.mD1gPwe2EZMYsvj//1n4z6YCa0AXwp7DChrohG", "0321654987", "profile8.jpg", "token789", new DateTime(2025, 5, 5, 12, 0, 0, 0, DateTimeKind.Unspecified), "CUSTOMER", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 9, true, "111 Võ Thị Sáu", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "phat.bui@gmail.com", false, "Bùi Tấn Phát", "$2a$12$9R8vUvTlZ4BdLdBz9QpMnOQVmSbSY.S/5GfjYHq5Wg.Z7keDKMroy", "0456987213", "profile9.jpg", "", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "ADMIN", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 10, true, "123 Nguyễn Đình Chiểu", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "nhung.cao@gmail.com", false, "Cao Hồng Nhung", "$2a$12$ApFZCAxoW3PAJJHb.JOqV.vdkdPZLtdIqa1EL49BTH.sedTX4HoQO", "0678912345", "profile10.jpg", "", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified), "EMPLOYEE", new DateTime(2025, 2, 22, 12, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "ProductSpecificationGroups",
                columns: new[] { "ProductSpecificationGroupId", "CategoryId", "DisplayOrder", "GroupName" },
                values: new object[,]
                {
                    { 1, 1, 1, "Màn hình" },
                    { 2, 1, 2, "Camera sau" },
                    { 3, 1, 3, "Camera trước" },
                    { 4, 1, 4, "Vi xử lý & đồ họa" },
                    { 5, 1, 5, "Giao tiếp & kết nối" },
                    { 6, 1, 6, "RAM & lưu trữ" },
                    { 7, 1, 7, "Pin & công nghệ sạc" },
                    { 8, 1, 8, "Tính năng khác" },
                    { 9, 1, 9, "Bộ xử lý & Đồ họa" },
                    { 10, 1, 10, "Kích thước & Trọng lượng" },
                    { 11, 1, 11, "Thiết kế & Trọng lượng" },
                    { 12, 1, 12, "Thông số khác" },
                    { 13, 1, 13, "Tiện ích khác" },
                    { 14, 1, 14, "Cổng kết nối" },
                    { 15, 1, 15, "Thông tin chung" }
                });

<<<<<<<< HEAD:PhoneStoreBackend/Migrations/20250221190525_initdb.cs
========
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "BrandId", "CategoryId", "Description", "Name" },
                values: new object[,]
                {
                    { 1, 1, 1, "<p><strong>Chip A17 Pro</strong> với hiệu suất vượt trội và camera 48MP.</p>", "iPhone 15 Pro Max" },
                    { 2, 1, 1, "<p>Màn hình <strong>6.1 inch</strong> Super Retina XDR, chip A17 Pro.</p>", "iPhone 15 Pro" },
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
                    { 27, 9, 1, "Điện thoại siêu bền chuẩn quân đội", "Nokia XR21" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "BrandId", "CategoryId", "Description", "Name" },
                values: new object[] { 28, 4, 1, "Điện thoại chụp ảnh zoom ấn tượng", "Oppo Reno 10 Pro+" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "BrandId", "CategoryId", "Description", "Name" },
                values: new object[] { 29, 6, 1, "Điện thoại giá rẻ với camera 200MP", "Realme 11 Pro+" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "BrandId", "CategoryId", "Description", "Name" },
                values: new object[] { 30, 7, 1, "Điện thoại tầm trung với hiệu năng mạnh", "OnePlus Nord 3" });

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
                    { 9, "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_10__1.jpg", false, 1 },
                    { 10, "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png", true, 2 },
                    { 11, "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png", true, 3 },
                    { 12, "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png", true, 4 },
                    { 13, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png", true, 5 },
                    { 14, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png", true, 6 },
                    { 15, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro-max-256gb.png", true, 7 },
                    { 16, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro-max-256gb.png", true, 8 },
                    { 17, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__4.png", true, 9 },
                    { 18, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__4.png", true, 10 },
                    { 19, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14_1.png", true, 11 },
                    { 20, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14_1.png", true, 12 },
                    { 21, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13-pro-max.png", true, 13 },
                    { 22, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1_66_6_2_4.jpg", true, 14 },
                    { 23, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png", true, 15 },
                    { 24, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/_/0/_0002_iphone-se-starlight-select-20220_2_2.jpg", true, 16 },
                    { 25, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png", true, 17 },
                    { 26, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-pro-2022-12-9-inch-m2_3.png", true, 18 },
                    { 27, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-pro-2-usb-c_1_.png", true, 19 },
                    { 28, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/w/a/watch6_classic_thumbnail_1.png", true, 20 },
                    { 29, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/3/13_prooo_2_2_3.jpg", true, 21 },
                    { 30, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/3/13_prooo_2_2_3.jpg", true, 22 },
                    { 31, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-find-x6-pro.png", true, 23 },
                    { 32, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-find-x6-pro.png", true, 24 },
                    { 33, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/i/vivo-x90-pro.png", true, 25 },
                    { 34, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/i/vivo-x90-pro.png", true, 26 },
                    { 35, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/u/purple-be8e0ce5d0.png", true, 27 },
                    { 36, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/u/purple-be8e0ce5d0.png", true, 28 },
                    { 37, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus_11_-_black_-_rgb.jpg", true, 29 },
                    { 38, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus_11_-_black_-_rgb.jpg", true, 30 },
                    { 39, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/o/sony-xperia-1-v.png", true, 31 },
                    { 40, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/o/sony-xperia-1-v.png", true, 32 },
                    { 41, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nokia-xr21.png", true, 33 },
                    { 42, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nokia-xr21.png", true, 34 }
                });

            migrationBuilder.InsertData(
                table: "ProductImages",
                columns: new[] { "ImageId", "ImageUrl", "IsMain", "ProductVariantId" },
                values: new object[,]
                {
                    { 43, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/s/asus-rog-phone-7.png", true, 35 },
                    { 44, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/s/asus-rog-phone-7.png", true, 36 },
                    { 45, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-pad-6-pro_2_.png", true, 37 },
                    { 46, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-pad-6-pro_2_.png", true, 38 },
                    { 47, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_509_55_.png", true, 39 },
                    { 48, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_509_13__1.png", true, 40 },
                    { 49, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_560_13_.png", true, 41 },
                    { 50, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_562_2_.png", true, 42 },
                    { 51, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/o/sony-xperia-1-v.png", true, 43 },
                    { 52, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nokia-xr21.png", true, 44 },
                    { 53, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png", true, 45 },
                    { 54, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png", true, 46 },
                    { 55, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/r/e/realme_note_50_8_.png", true, 47 },
                    { 56, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/r/e/realme_note_50_8_.png", true, 48 },
                    { 57, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus-nord-3_1_2.png", true, 49 },
                    { 58, "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus-nord-3_1_2.png", true, 50 }
                });

            migrationBuilder.InsertData(
                table: "ProductSpecifications",
                columns: new[] { "SpecificationId", "DisplayOrder", "IsSpecial", "Key", "ProductSpecificationGroupId", "ProductVariantId", "Value" },
                values: new object[,]
                {
                    { 1, 1, true, "Kích thước màn hình", 1, 1, "6.7 inchs" },
                    { 2, 2, true, "Công nghệ màn hình", 1, 1, "Super Retina XDR OLED" },
                    { 3, 3, true, "Độ phân giải màn hình", 1, 1, "2796 x 1290-pixel" },
                    { 4, 4, false, "Tính năng màn hình", 1, 1, "Tốc độ làm mới 120Hz\n460 ppi\n2000 nits\nHDR\nTrue Tone\nDải màu rộng (P3)\nHaptic Touch\nTỷ lệ tương phản 2.000.000:1" },
                    { 5, 5, true, "Tần số quét", 1, 1, "120Hz" },
                    { 6, 6, false, "Kiểu màn hình", 1, 1, "Dynamic Island" },
                    { 7, 1, false, "Camera sau", 2, 1, "Camera chính: 48MP, 24 mm, ƒ/1.78\nCamera góc siêu rộng: 12 MP, 13 mm, ƒ/2.2\nCamera Tele: 12 MP" },
                    { 8, 2, false, "Quay video", 2, 1, "4K@24/25/30/60 fps\nHD 1080p@25/30/60 fps\nHD 720p@30 fps" },
                    { 9, 3, false, "Tính năng camera", 2, 1, "Flash True Tone Thích Ứng\nPhotonic Engine\nDeep Fusion\nHDR thông minh thế hệ 5\nẢnh chân dung thế hệ mới với Focus và Depth Control\nHiệu ứng Chiếu Sáng Chân Dung với sáu chế độ\nChế độ Ban Đêm" },
                    { 10, 1, false, "Camera trước", 3, 1, "12MP, ƒ/1.9" },
                    { 11, 2, false, "Quay video trước", 3, 1, "4K@24/25/30/60 fps\nHD 1080p@25/30/60 fps" },
                    { 12, 1, true, "Chipset", 4, 1, "Apple A17 Pro 6 nhân" },
                    { 13, 2, true, "GPU", 4, 1, "GPU 6 nhân mới" },
                    { 14, 1, true, "Công nghệ NFC", 5, 1, "Có" },
                    { 15, 2, true, "Thẻ SIM", 5, 1, "2 SIM (nano‑SIM và eSIM)" },
                    { 16, 3, true, "Hồng ngoại", 5, 1, "Có" },
                    { 17, 4, true, "Jack tai nghe 3.5", 5, 1, "Không" },
                    { 18, 5, false, "Hỗ trợ mạng", 5, 1, "5G" },
                    { 19, 6, true, "GPS", 5, 1, "GPS tần số kép chính xác (GPS, GLONASS, Galileo, QZSS, BeiDou và NavIC)" },
                    { 20, 1, true, "Dung lượng RAM", 6, 1, "8 GB" },
                    { 21, 2, true, "Bộ nhớ trong", 6, 1, "256 GB" },
                    { 22, 3, false, "Khe cắm thẻ nhớ", 6, 1, "Không" },
                    { 23, 1, true, "Pin", 7, 1, "4422 mAh" },
                    { 24, 2, false, "Công nghệ sạc", 7, 1, "Sạc nhanh 20 W\nSạc không dây 15W\nSạc không dây Qi 7.5W" },
                    { 25, 3, true, "Cổng sạc", 7, 1, "USB Type-C" },
                    { 26, 1, true, "Hệ điều hành", 8, 1, "iOS 17" }
                });

            migrationBuilder.InsertData(
                table: "ProductSpecifications",
                columns: new[] { "SpecificationId", "DisplayOrder", "IsSpecial", "Key", "ProductSpecificationGroupId", "ProductVariantId", "Value" },
                values: new object[,]
                {
                    { 27, 1, false, "Loại CPU", 9, 1, "CPU 6 lõi mới với 2 lõi hiệu năng và 4 lõi hiệu suất" },
                    { 28, 1, false, "Kích thước", 10, 1, "159,9 x 76,7 x 8,25 mm" },
                    { 29, 2, false, "Trọng lượng", 10, 1, "221 g" },
                    { 30, 1, false, "Chất liệu mặt lưng", 11, 1, "Kính" },
                    { 31, 2, false, "Chất liệu khung viền", 11, 1, "Titanium" },
                    { 32, 1, false, "Chỉ số kháng nước, bụi", 12, 1, "Đạt mức IP68 (chống nước ở độ sâu tối đa 6 mét trong vòng tối đa 30 phút)" },
                    { 33, 2, false, "Công nghệ - Tiện ích", 12, 1, "Camera TrueDepth hỗ trợ nhận diện khuôn mặt" },
                    { 34, 3, false, "Tiện ích khác", 12, 1, "SOS Khẩn Cấp\nPhát Hiện Va Chạm" },
                    { 35, 4, false, "Công nghệ âm thanh", 12, 1, "AAC, MP3, Apple Lossless, FLAC, Dolby Digital, Dolby Digital Plus và Dolby Atmos" },
                    { 36, 1, true, "Cảm biến vân tay", 13, 1, "Không" },
                    { 37, 2, false, "Các loại cảm biến", 13, 1, "Cảm biến gia tốc\nCảm biến tiệm cận\nCảm biến ánh sáng\nLa bàn\nCon quay hồi chuyển\nCảm biến áp kế\nCảm biến trọng lực" },
                    { 38, 3, false, "Tính năng đặc biệt", 13, 1, "Hỗ trợ 5G\nSạc không dây\nNhận diện khuôn mặt\nKháng nước, kháng bụi\nĐiện thoại AI" },
                    { 39, 1, true, "Wi-Fi", 14, 1, "Wi‑Fi 6E (802.11ax)" },
                    { 40, 2, true, "Bluetooth", 14, 1, "v5.3" },
                    { 41, 1, false, "Thời điểm ra mắt", 15, 1, "09/2023" }
                });

>>>>>>>> 4d00aa3ece0a6eabb411f5c9a7e47f3d14a1300b:PhoneStoreBackend/Migrations/20250221190347_initDB.cs
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
