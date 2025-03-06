using Microsoft.AspNetCore.SignalR;

namespace PhoneStoreBackend.Hubs
{
    public class CommentHub : Hub
    {
        public async Task SendComment(string username, string productName)
        {
            await Clients.All.SendAsync("ReceiveComment", username, productName);
        }
    }
}
