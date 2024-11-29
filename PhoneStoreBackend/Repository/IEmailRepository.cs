namespace PhoneStoreBackend.Repository
{
    public interface IEmailRepository
    {
        Task SendEmailAsync(string to, string subject, string body);
    }
}
