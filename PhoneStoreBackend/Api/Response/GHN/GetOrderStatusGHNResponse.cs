namespace PhoneStoreBackend.Api.Response.GHN
{
    public class GetOrderStatusGHNResponse
    {
        public string Status { get; set; }
        public List<LogEntry> Log { get; set; }
    }
}
