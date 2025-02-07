using Microsoft.Data.SqlClient;

namespace PhoneStoreBackend.Helpers
{
    public class DatabaseConnectionHelper
    {
        private readonly IConfiguration _configuration;

        public DatabaseConnectionHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetAvailableConnectionString()
        {
            var connectionStrings = _configuration.GetSection("ConnectionStrings").GetChildren()
                .ToDictionary(x => x.Key, x => x.Value);

            foreach (var connection in connectionStrings)
            {
                if (TestConnection(connection.Value))
                {
                    Console.WriteLine($"✅ Sử dụng kết nối: {connection.Key}");
                    return connection.Value;
                }
            }

            throw new Exception("Không có kết nối khả dụng!");
        }

        private bool TestConnection(string connectionString)
        {
            try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}
