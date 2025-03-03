using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.Enums;
using PhoneStoreBackend.Repository;
using PhoneStoreBackend.Repository.Implements;
using System.Text;
using System.Text.Json;
using VNPAY.NET;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers().ConfigureApiBehaviorOptions(options => { options.SuppressModelStateInvalidFilter = true; }); ;

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("V1", new OpenApiInfo
    {
        Version = "V1",
        Title = "WebAPI",
        Description = "Product WebAPI"
    });
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Id = "Bearer",
                        Type = ReferenceType.SecurityScheme
                }
            },
            new List < string > ()
        }
    });
});

// Register CloudinaryService
// Đọc cấu hình Cloudinary từ appsettings.json
var cloudinarySettings = builder.Configuration.GetSection("Cloudinary");

// Kiểm tra giá trị cấu hình
string cloudName = cloudinarySettings["CloudName"];
string apiKey = cloudinarySettings["ApiKey"];
string apiSecret = cloudinarySettings["ApiSecret"];

if (string.IsNullOrWhiteSpace(cloudName) || string.IsNullOrWhiteSpace(apiKey) || string.IsNullOrWhiteSpace(apiSecret))
{
    throw new InvalidOperationException("Cloudinary configuration is missing in appsettings.json.");
}

// Đăng ký CloudinaryService với DI container
builder.Services.AddSingleton(new CloudinaryService(cloudName, apiKey, apiSecret));

// get key of ghn
builder.Services.Configure<GHNSettings>(
    builder.Configuration.GetSection("GHN"));

// Repository and service registration
builder.Services.AddScoped<IGHNRepository, GHNService>();
builder.Services.AddScoped<ICommentRepository, CommentService>();
builder.Services.AddScoped<ITokenRepository, TokenService>();
builder.Services.AddScoped<IEmailRepository, EmailService>();
builder.Services.AddScoped<IAuthRepository, AuthService>();
builder.Services.AddScoped<IUserRepository, UserService>();
builder.Services.AddScoped<IProductRepository, ProductService>();
builder.Services.AddScoped<IProductVariantRepository, ProductVariantService>();
builder.Services.AddScoped<ICategoryRepository, CategoryService>();
builder.Services.AddScoped<IBrandRepository, BrandService>();
builder.Services.AddScoped<IOrderRepository, OrderService>();
builder.Services.AddScoped<IOrderDetailRepository, OrderDetailService>();
builder.Services.AddScoped<ICartRepository, CartService>();
builder.Services.AddScoped<ICartItemRepository, CartItemService>();
builder.Services.AddScoped<IDiscountRepository, DiscountService>();
builder.Services.AddScoped<ICouponRepository, CouponService>();
builder.Services.AddScoped<IAddressRepository, AddressService>();
builder.Services.AddScoped<IPaymentRepository, PaymentService>();
builder.Services.AddScoped<IProductImageRepository, ProductImageService>();
builder.Services.AddScoped<IProductSpecificationRepository, ProductSpecificationService>();
builder.Services.AddScoped<IProductSpecificationGroupRepository, ProductSpecificationGroupService>();
builder.Services.AddScoped<IReviewRepository, ReviewService>();
builder.Services.AddScoped<IWishlistRepository, WishlistService>();
builder.Services.AddScoped<IActivityLogRepository, ActivityLogService>();
builder.Services.AddScoped<INotificationRepository, NotificationService>();
builder.Services.AddScoped<ICustomerRepository, CustomerService>();
builder.Services.AddScoped<IDashboardRepository, DashboardService>();


// Add VNPAY service to the container.
builder.Services.AddSingleton<IVnpay, Vnpay>();


// Database configuration
//builder.Services.AddDbContext<AppDbContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Database configuration của Cuong
//builder.Services.AddDbContext<AppDbContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("Connection2")));

// Đọc connection string động
//var dbHelper = new DatabaseConnectionHelper(builder.Configuration);
//string connectionString = dbHelper.GetAvailableConnectionString();
//var dbHelper = new DatabaseConnectionHelper(builder.Configuration);
//string connectionString = dbHelper.GetAvailableConnectionString();

//builder.Services.AddDbContext<AppDbContext>(options =>
//    options.UseSqlServer(connectionString));

//Database configuration của Cuong
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Connection1")));

//Database configuration của Bien
//builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Connection2")));


// JWT and Google OAuth2 configuration
var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];
var secretKeyBytes = Encoding.UTF8.GetBytes(jwtKey);
var signingKey = new SymmetricSecurityKey(secretKeyBytes);

var googleClientId = builder.Configuration["Authentication:Google:ClientId"];
var googleClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = signingKey,
        ClockSkew = TimeSpan.Zero
    };
})
.AddCookie()
.AddGoogle(GoogleDefaults.AuthenticationScheme, options =>
{
    options.ClientId = googleClientId;
    options.ClientSecret = googleClientSecret;
    options.CallbackPath = "/api/auth/signin-google";
});

// Authorization policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("authenticated", policy => policy.RequireAuthenticatedUser());
    options.AddPolicy("ADMIN", policy => policy.RequireRole(RoleEnum.ADMIN.ToString()));
});

// Logging configuration
builder.Services.AddLogging(logging =>
{
    logging.ClearProviders();
    logging.AddConsole();
    logging.AddDebug();
});

// Add HttpContextAccessor and HttpClient
builder.Services.AddHttpContextAccessor();
builder.Services.AddHttpClient();

// Configure AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// Thêm CORS policy 
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://biendev.io.vn") // Thêm domain mới
              .AllowAnyMethod()  // Cho phép tất cả HTTP methods
              .AllowAnyHeader()  // Cho phép tất cả headers
              .AllowCredentials(); // Hỗ trợ cookie, token
    });
});

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("FrontendPolicy", policy =>
//    {
//        policy.AllowAnyOrigin()  // Cho phép tất cả origin
//              .AllowAnyMethod()   // Cho phép tất cả HTTP methods
//              .AllowAnyHeader();  // Cho phép tất cả headers
//    });
//});



// Build application
var app = builder.Build();

// Middleware configuration
if (app.Environment.IsDevelopment() || true)
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/V1/swagger.json", "PhoneStore WebAPI");
    });
}
app.UseExceptionHandler("/error");
app.UseStatusCodePages("text/plain", "Status code: {0}");

app.UseHttpsRedirection();

app.UseCors("FrontendPolicy");

app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode == 401)
    {
        context.Response.ContentType = "application/json";

        context.Response.StatusCode = 401;

        // Create a structured response object
        var response = new Response<object>
        {
            Success = false,
            Message = "Unauthorized",
            Data = null
        };

        var jsonResponse = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
        });

        await context.Response.WriteAsync(jsonResponse);
    }
});

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
//app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.Run();
