using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository.Implements
{
    public class CartService : ICartRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CartService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CartResponse> GetCartByUserIdAsync(int userId)
        {
            var cart = await _context.Carts
                .Where(c => c.UserId == userId)
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.ProductVariant)
                        .ThenInclude(pv => pv.Product)
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.ProductVariant)
                        .ThenInclude(pv => pv.Discount)
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.ProductVariant)
                        .ThenInclude(pv => pv.ProductImages)
                .FirstOrDefaultAsync();

            // Nếu không tìm thấy giỏ hàng, tạo mới
            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = userId,
                    CartItems = new List<CartItem>()
                };

                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            // Chuyển đổi `cart` sang `CartResponse`
            return new CartResponse
            {
                CartId = cart.CartId,
                CartItems = cart.CartItems.Select(ci => new CartItemResponse
                {
                    CartItemId = ci.CartItemId,
                    CartId = ci.CartId,
                    Quantity = ci.Quantity,
                    ProductVariant = new VariantBasicResponse
                    {
                        ProductVariantId = ci.ProductVariantId,
                        FullNameVariant = ci.ProductVariant.VariantName,
                        Color = ci.ProductVariant.Color,
                        DiscountPercentage = ci.ProductVariant.Discount?.Percentage ?? 0,
                        ImageUrl = ci.ProductVariant.ProductImages.FirstOrDefault()?.ImageUrl ?? "",
                        ImportPrice = ci.ProductVariant.ImportPrice,
                        Price = ci.ProductVariant.Price,
                        Slug = ci.ProductVariant.Slug,
                        Stock = ci.ProductVariant.Stock,
                        Storage = ci.ProductVariant.Storage,
                    }
                }).ToList()
            };
        }



        public async Task<CartItemResponse> AddCartItemAsync(int userId, CartItem cartItem)
        {
            // Tìm giỏ hàng của người dùng
            var findCart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (findCart == null)
            {
                // Nếu không có giỏ hàng, tạo mới
                findCart = new Cart { UserId = userId };
                _context.Carts.Add(findCart);
            }

            // Kiểm tra xem productVariantId đã tồn tại trong CartItems của giỏ hàng chưa
            var existingCartItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartId == findCart.CartId && ci.ProductVariantId == cartItem.ProductVariantId);

            if (existingCartItem != null)
            {
                // Nếu tồn tại, cập nhật số lượng của item
                existingCartItem.Quantity += cartItem.Quantity;
                await _context.SaveChangesAsync();

                // Lấy thông tin CartItem đã cập nhật
                var updatedCartItem = await _context.CartItems
                    .Include(ci => ci.ProductVariant)
                        .ThenInclude(pv => pv.Product)
                    .Include(ci => ci.ProductVariant)
                        .ThenInclude(pv => pv.Discount)
                    .Include(ci => ci.ProductVariant)
                        .ThenInclude(pv => pv.ProductImages)
                    .FirstOrDefaultAsync(ci => ci.CartItemId == existingCartItem.CartItemId);

                // Trả về thông tin CartItem đã cập nhật
                return new CartItemResponse
                {
                    CartItemId = updatedCartItem.CartItemId,
                    CartId = updatedCartItem.CartId,
                    Quantity = updatedCartItem.Quantity,
                    ProductVariant = new VariantBasicResponse
                    {
                        ProductVariantId = updatedCartItem.ProductVariantId,
                        FullNameVariant = updatedCartItem.ProductVariant.Product.Name + " " + updatedCartItem.ProductVariant.VariantName,
                        Color = updatedCartItem.ProductVariant.Color,
                        DiscountPercentage = updatedCartItem.ProductVariant.Discount?.Percentage ?? 0,
                        ImageUrl = updatedCartItem.ProductVariant.ProductImages.FirstOrDefault()?.ImageUrl ?? "",
                        ImportPrice = updatedCartItem.ProductVariant.ImportPrice,
                        Price = updatedCartItem.ProductVariant.Price,
                        Slug = updatedCartItem.ProductVariant.Slug,
                        Stock = updatedCartItem.ProductVariant.Stock,
                        Storage = updatedCartItem.ProductVariant.Storage,
                    }
                };
            }
            else
            {
                // Nếu không tồn tại, thêm mới CartItem
                cartItem.CartId = findCart.CartId;
                var newCartItem = _context.CartItems.Add(cartItem);
                await _context.SaveChangesAsync();

                // Lấy thông tin CartItem mới thêm
                var newCartItemDetails = await _context.CartItems
                    .Include(ci => ci.ProductVariant)
                        .ThenInclude(pv => pv.Product)
                    .Include(ci => ci.ProductVariant)
                        .ThenInclude(pv => pv.Discount)
                    .Include(ci => ci.ProductVariant)
                        .ThenInclude(pv => pv.ProductImages)
                    .FirstOrDefaultAsync(ci => ci.CartItemId == newCartItem.Entity.CartItemId);

                // Trả về thông tin CartItem đã thêm
                return new CartItemResponse
                {
                    CartItemId = newCartItemDetails.CartItemId,
                    CartId = newCartItemDetails.CartId,
                    Quantity = newCartItemDetails.Quantity,
                    ProductVariant = new VariantBasicResponse
                    {
                        ProductVariantId = newCartItemDetails.ProductVariantId,
                        FullNameVariant = newCartItemDetails.ProductVariant.Product.Name + " " + newCartItemDetails.ProductVariant.VariantName,
                        Color = newCartItemDetails.ProductVariant.Color,
                        DiscountPercentage = newCartItemDetails.ProductVariant.Discount?.Percentage ?? 0,
                        ImageUrl = newCartItemDetails.ProductVariant.ProductImages.FirstOrDefault()?.ImageUrl ?? "",
                        ImportPrice = newCartItemDetails.ProductVariant.ImportPrice,
                        Price = newCartItemDetails.ProductVariant.Price,
                        Slug = newCartItemDetails.ProductVariant.Slug,
                        Stock = newCartItemDetails.ProductVariant.Stock,
                        Storage = newCartItemDetails.ProductVariant.Storage,
                    }
                };
            }
        }

        public async Task<CartItemResponse> UpdateCartItemAsync(int userId, int itemId, CartItem cartItem)
        {
            // Tìm sản phẩm trong giỏ hàng của người dùng
            var existingItem = await _context.CartItems
                .Include(ci => ci.ProductVariant)
                    .ThenInclude(pv => pv.Product)
                .Include(ci => ci.ProductVariant)
                    .ThenInclude(pv => pv.Discount)
                .Include(ci => ci.ProductVariant)
                    .ThenInclude(pv => pv.ProductImages)
                .FirstOrDefaultAsync(ci => ci.CartItemId == itemId && ci.Cart.UserId == userId);

            if (existingItem == null)
            {
                return null;  // Nếu không tìm thấy item thì trả về null
            }

            // Cập nhật số lượng sản phẩm
            existingItem.Quantity = cartItem.Quantity;
            await _context.SaveChangesAsync();

            // Trả về thông tin CartItem đã cập nhật
            return new CartItemResponse
            {
                CartItemId = existingItem.CartItemId,
                CartId = existingItem.CartId,
                Quantity = existingItem.Quantity,
                ProductVariant = new VariantBasicResponse
                {
                    ProductVariantId = existingItem.ProductVariantId,
                    FullNameVariant = existingItem.ProductVariant.Product.Name + " " + existingItem.ProductVariant.VariantName,
                    Color = existingItem.ProductVariant.Color,
                    DiscountPercentage = existingItem.ProductVariant.Discount?.Percentage ?? 0,
                    ImageUrl = existingItem.ProductVariant.ProductImages.FirstOrDefault()?.ImageUrl ?? "",
                    ImportPrice = existingItem.ProductVariant.ImportPrice,
                    Price = existingItem.ProductVariant.Price,
                    Slug = existingItem.ProductVariant.Slug,
                    Stock = existingItem.ProductVariant.Stock,
                    Storage = existingItem.ProductVariant.Storage,
                }
            };
        }


        public async Task<bool> RemoveCartItemAsync(int userId, int itemId)
        {
            var item = await _context.CartItems.FirstOrDefaultAsync(ci => ci.CartItemId == itemId && ci.Cart.UserId == userId);
            if (item != null)
            {
                _context.CartItems.Remove(item);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<ICollection<CartResponse>> GetAllAsync()
        {
            var listCart = await _context.Carts
                .Include(c => c.CartItems)
                     .ThenInclude(ci => ci.ProductVariant)
                        .ThenInclude(pv => pv.Product)
                 .Include(c => c.CartItems)
                     .ThenInclude(ci => ci.ProductVariant)
                        .ThenInclude(pv => pv.Discount)
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.ProductVariant)
                .ThenInclude(pv => pv.ProductImages)
                .Select(c => new CartResponse
                {
                    CartId = c.CartId,
                    CartItems = c.CartItems.Select(ci => new CartItemResponse
                    {
                        CartItemId = ci.CartItemId,
                        CartId = ci.CartId,
                        Quantity = ci.Quantity,
                        ProductVariant = new VariantBasicResponse
                        {
                            ProductVariantId = ci.ProductVariantId,
                            FullNameVariant = ci.ProductVariant.Product.Name + " " + ci.ProductVariant.VariantName,
                            Color = ci.ProductVariant.Color,
                            DiscountPercentage = ci.ProductVariant.Discount != null ? ci.ProductVariant.Discount.Percentage : 0,
                            ImageUrl = ci.ProductVariant.ProductImages.FirstOrDefault().ImageUrl ?? "",
                            ImportPrice = ci.ProductVariant.ImportPrice,
                            Price = ci.ProductVariant.Price,
                            Slug = ci.ProductVariant.Slug,
                            Stock = ci.ProductVariant.Stock,
                            Storage = ci.ProductVariant.Storage,
                        }
                    }).ToList()
                })
                .ToListAsync();

            return listCart;
        }
    }
}
