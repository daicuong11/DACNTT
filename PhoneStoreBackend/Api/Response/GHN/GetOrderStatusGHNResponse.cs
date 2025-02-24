using System.Text.Json.Serialization;

namespace PhoneStoreBackend.Api.Response.GHN
{
    public class GetOrderStatusGHNResponse
    {
        [JsonPropertyName("status")]
        public string Status { get; set; }
        [JsonPropertyName("log")]
        public List<LogEntry> Log { get; set; }
    }
}
