using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;

namespace PhoneStoreBackend.Repository.Implements
{
    public class EmailService : IEmailRepository
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                using var smtpClient = new SmtpClient
                {
                    Host = _configuration["Email:SmtpHost"] ?? throw new InvalidOperationException("SMTP host is not configured."),
                    Port = int.TryParse(_configuration["Email:Port"], out var port) ? port : throw new InvalidOperationException("Invalid SMTP port."),
                    Credentials = new NetworkCredential(
                        _configuration["Email:Username"],
                        _configuration["Email:Password"]
                    ),
                    EnableSsl = bool.TryParse(_configuration["Email:EnableSsl"], out var enableSsl) && enableSsl
                };

                using var mailMessage = new MailMessage
                {
                    From = new MailAddress(_configuration["Email:From"] ?? throw new InvalidOperationException("Sender email is not configured.")),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                mailMessage.To.Add(to);

                await smtpClient.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                // Log lỗi (có thể dùng ILogger)
                Console.WriteLine($"Lỗi gửi email: {ex.Message}");
                throw;
            }
        }
    }
}
