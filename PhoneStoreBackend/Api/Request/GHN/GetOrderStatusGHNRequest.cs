using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Api.Request.GHN
{
    public class GetOrderStatusGHNRequest
    {
        [JsonPropertyName("client_order_code")]
        public string ClientOrderCode { get; set; }
    }
}
