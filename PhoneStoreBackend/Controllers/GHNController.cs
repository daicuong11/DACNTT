using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Api.Request.GHN;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.Enums;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Controllers
{
    [Route("api/ghn")]
    [ApiController]
    public class GHNController : ControllerBase
    {
        private readonly IGHNRepository _gHNRepository;
        private readonly AppDbContext _context;

        public GHNController(IGHNRepository gHNRepository, AppDbContext context)
        {
            _gHNRepository = gHNRepository;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateGHNOrder ([FromBody] AddGHNOrderRequest orderReq)
        {
            var responseError = ModelStateHelper.CheckModelState(ModelState);
            if (responseError != null)
                return BadRequest(responseError);

            try {
                var orderId = orderReq.OrderId;
                var findOrder = await _context.Orders
                    .Include(o => o.Customer)
                    .Include(o => o.OrderDetails)
                        .ThenInclude(od => od.ProductVariant)
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);
                if (findOrder == null)
                {
                    return BadRequest(Response<object>.CreateErrorResponse("Không tìm thấy đơn hàng với id = " + orderId));
                }
                var getSumQuantity = findOrder.OrderDetails.Sum(od => od.Quantity);
                var getListAdress = findOrder.ShippingAddress.Split(", ");
                if(getListAdress.Length != 4) { 
                    return BadRequest(Response<object>.CreateErrorResponse("Địa chỉ giao hàng không hợp lệ"));
                }
                var address = getListAdress[0].Trim();
                var wad = getListAdress[1].Trim();
                var district = getListAdress[2].Trim();
                var province = getListAdress[3].Trim();
                var ghnReq = new CreateOrderGHNRequest
                {
                    ClientOrderCode = findOrder.OrderId.ToString(),
                    PaymentTypeId = 2,
                    Height = (int)Math.Ceiling(getSumQuantity * 6m),
                    Length = 30,
                    Weight = (int)Math.Ceiling(getSumQuantity * 300m),
                    Width = 30,
                    RequiredNote = RequiredNoteGHNEnum.KHONGCHOXEMHANG.ToString(),
                    ServiceTypeId = 2,
                    ToProvinceName = province,
                    ToDistrictName = district,
                    ToWardName = wad,
                    ToAddress = address,
                    ToName = findOrder.Customer.Name,
                    ToPhone = findOrder.Customer.PhoneNumber,
                    Items = findOrder.OrderDetails.Select(od => new ItemOrderGHNRequest
                    {
                        Name =od.ProductVariant.VariantName,
                        Quantity = od.Quantity,
                    }).ToList()
                };

                var createdGHNOrder = await _gHNRepository.CreateGHNOrder(ghnReq);
                if (createdGHNOrder == null)
                    throw new Exception("Không thể tạo đơn hàng GHN.");

                return Ok(Response<object>.CreateSuccessResponse(new
                {
                        order_code = createdGHNOrder.OrderCode,
                        total_fee = createdGHNOrder.TotalFee,
                        expected_delivery_time = createdGHNOrder.ExpectedDeliveryTime,
                }, "Đơn hàng đã được thêm thành công"));
            }
            catch (Exception ex)
            {
                return BadRequest(Response<object>.CreateErrorResponse($"Đã xảy ra lỗi: {ex.Message}"));

            }
        }
    }
}
