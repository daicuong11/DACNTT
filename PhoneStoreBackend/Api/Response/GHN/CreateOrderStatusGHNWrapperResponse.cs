using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Api.Response.GHN
{
    public class CreateOrderStatusGHNWrapperResponse
    {
        [JsonPropertyName("data")]
        public GetOrderStatusGHNResponse data { get; set; }
    }
}
