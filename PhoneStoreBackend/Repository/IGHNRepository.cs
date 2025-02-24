using PhoneStoreBackend.Api.Request.GHN;
using PhoneStoreBackend.Api.Response.GHN;

namespace PhoneStoreBackend.Repository
{
    public interface IGHNRepository
    {
        Task<CreateOrderGHNResponse> CreateGHNOrder(CreateOrderGHNRequest request);
        Task<GetOrderStatusGHNResponse> GetGHNOrderStatusByClientOrderCode(GetOrderStatusGHNRequest request);
    }
}
