using Microsoft.Extensions.Options;
using PhoneStoreBackend.Api.Request.GHN;
using PhoneStoreBackend.Api.Response.GHN;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace PhoneStoreBackend.Repository.Implements
{
    public class GHNSettings
    {
        public string Token { get; set; }
        public string ShopId { get; set; }
        public string BaseUrl { get; set; }
    }

    public class GHNService : IGHNRepository
    {
        private readonly HttpClient _httpClient;
        private readonly GHNSettings _ghnSettings;
        private readonly JsonSerializerOptions _jsonOptions;

        public GHNService(IHttpClientFactory httpClientFactory, IOptions<GHNSettings> ghnSettings)
        {
            _httpClient = httpClientFactory.CreateClient();
            _ghnSettings = ghnSettings.Value;

            Console.WriteLine($"Token: {_ghnSettings.Token}");
            Console.WriteLine($"ShopId: {_ghnSettings.ShopId}");
            Console.WriteLine($"BaseUrl: {_ghnSettings.BaseUrl}");

            _httpClient.BaseAddress = new Uri(_ghnSettings.BaseUrl);
            _httpClient.DefaultRequestHeaders.Add("Token", _ghnSettings.Token);
            _httpClient.DefaultRequestHeaders.Add("ShopId", _ghnSettings.ShopId);
        }

        public async Task<CreateOrderGHNResponse> CreateGHNOrder(CreateOrderGHNRequest request)
        {
            var jsonContent = new StringContent(
                JsonSerializer.Serialize(request, _jsonOptions),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync("v2/shipping-order/create", jsonContent);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"Lỗi tạo đơn hàng GHN: {error}");
            }

            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<CreateOrderGHNWrapperResponse>(responseBody, _jsonOptions);

            return result?.Data ?? throw new Exception("Lỗi deserialize response từ GHN.");

        }

        public async Task<GetOrderStatusGHNResponse> GetGHNOrderStatusByClientOrderCode(GetOrderStatusGHNRequest request)
        {
            var jsonContent = new StringContent(
                JsonSerializer.Serialize(request, _jsonOptions),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync("/v2/shipping-order/detail-by-client-code", jsonContent);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"Lỗi lấy trạng thái đơn hàng GHN: {error}");
            }

            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<GetOrderStatusGHNResponse>(responseBody, _jsonOptions);

            return result ?? throw new Exception("Lỗi deserialize response từ GHN.");
        }
    }
}
