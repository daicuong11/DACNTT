using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Api.Request.GHN;
using PhoneStoreBackend.Api.Response;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.Enums;
using PhoneStoreBackend.Helpers;
using PhoneStoreBackend.Repository;
using System.Text;
using System.IO;
using PhoneStoreBackend.Repository.Implements;


namespace PhoneStoreBackend.Controllers
{
    [Route("api/ghn")]
    [ApiController]
    public class GHNController : ControllerBase
    {
        private readonly IGHNRepository _gHNRepository;
        private readonly AppDbContext _context;
        private readonly IEmailRepository _emailRepository;

        public GHNController(IGHNRepository gHNRepository, AppDbContext context, IEmailRepository emailRepository)
        {
            _gHNRepository = gHNRepository;
            _context = context;
            _emailRepository = emailRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateGHNOrder([FromBody] AddGHNOrderRequest orderReq)
        {
            var responseError = ModelStateHelper.CheckModelState(ModelState);
            if (responseError != null)
                return BadRequest(responseError);

            try
            {
                var orderId = orderReq.OrderId;
                var findOrder = await _context.Orders
                    .Include(o => o.Customer)
                    .Include(o => o.OrderDetails)
                        .ThenInclude(od => od.ProductVariant)
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);

                if (findOrder == null)
                {
                    return BadRequest(Response<object>.CreateErrorResponse($"Không tìm thấy đơn hàng với id = {orderId}"));
                }

                if (string.IsNullOrWhiteSpace(findOrder.ShippingAddress))
                {
                    return BadRequest(Response<object>.CreateErrorResponse("Địa chỉ giao hàng không được để trống"));
                }

                string templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "order_template.html");
                string emailBody = await System.IO.File.ReadAllTextAsync(templatePath, Encoding.UTF8);


                var getListAdress = findOrder.ShippingAddress.Split(',')
                    .Select(x => x.Trim())
                    .ToArray();

                if (getListAdress.Length != 4)
                {
                    return BadRequest(Response<object>.CreateErrorResponse("Địa chỉ giao hàng không hợp lệ. Định dạng phải là: Số nhà, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố."));
                }

                var (address, ward, district, province) = (getListAdress[0], getListAdress[1], getListAdress[2], getListAdress[3]);

                var getSumQuantity = findOrder.OrderDetails.Sum(od => od.Quantity);
                if (getSumQuantity <= 0)
                {
                    return BadRequest(Response<object>.CreateErrorResponse("Số lượng sản phẩm trong đơn hàng không hợp lệ."));
                }

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
                    ToWardName = ward,
                    ToAddress = address,
                    ToName = findOrder.Customer.Name,
                    ToPhone = findOrder.Customer.PhoneNumber,
                    Items = findOrder.OrderDetails.Select(od => new ItemOrderGHNRequest
                    {
                        Name = od.ProductVariant.VariantName,
                        Quantity = od.Quantity,
                    }).ToList()
                };

                // Format danh sách sản phẩm
                string orderDetailsHtml = string.Join("", findOrder.OrderDetails.Select(od =>
                    $"<tr><td>{od.ProductVariant.VariantName}</td><td>{od.Quantity}</td><td>{(od.Price * (1 - od.Discount / 100m)):N0} VNĐ</td></tr>"
                ));


                // Thay thế các biến trong template bằng dữ liệu thực tế
                emailBody = emailBody
                    .Replace("{{OrderId}}", findOrder.OrderId.ToString())
                    .Replace("{{CustomerName}}", findOrder.Customer.Name)
                    .Replace("{{ShippingAddress}}", findOrder.ShippingAddress)
                    .Replace("{{OrderDate}}", findOrder.OrderDate.ToString("dd/MM/yyyy"))
                    .Replace("{{OrderDetails}}", orderDetailsHtml)
                    .Replace("{{ShippingFee}}", findOrder.ShippingFee.ToString("N0"))
                    .Replace("{{TotalAmount}}", findOrder.TotalAmount.ToString("N0"));

                await _emailRepository.SendEmailAsync("lydaicuong784@gmail.com", "Xác nhận đơn hàng #" + findOrder.OrderId, emailBody);


                var createdGHNOrder = await _gHNRepository.CreateGHNOrder(ghnReq);
                if (createdGHNOrder == null || string.IsNullOrEmpty(createdGHNOrder.OrderCode))
                {
                    return BadRequest(Response<object>.CreateErrorResponse("Không thể tạo đơn hàng GHN. Vui lòng thử lại sau."));
                }

                findOrder.Status = OrderStatusEnum.ready_to_pick.ToString();
                await _context.SaveChangesAsync();

                return Ok(Response<object>.CreateSuccessResponse(new
                {
                    order_code = createdGHNOrder.OrderCode,
                    total_fee = createdGHNOrder.TotalFee,
                    expected_delivery_time = createdGHNOrder.ExpectedDeliveryTime,
                }, "Đơn hàng đã được thêm thành công"));
            }
            catch (Exception ex)
            {
                return BadRequest(Response<object>.CreateErrorResponse("Đã xảy ra lỗi: " + ex.Message));
            }
        }

    }
}
