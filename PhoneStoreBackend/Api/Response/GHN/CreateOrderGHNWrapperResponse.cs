using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Api.Response.GHN
{
    public class CreateOrderGHNWrapperResponse
    {
        [JsonPropertyName("data")]
        public CreateOrderGHNResponse Data { get; set; }
    }

}
