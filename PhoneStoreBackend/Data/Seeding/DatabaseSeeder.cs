using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.Entities;
using System.Text.Json;

namespace PhoneStoreBackend.Data.Seeding
{
    public class DatabaseSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            SeedUserFromJson(modelBuilder, "users.json");
            SeedFromJson<Brand>(modelBuilder, "brands.json");
            SeedFromJson<Category>(modelBuilder, "categories.json");
            SeedFromJson<Product>(modelBuilder, "products.json");
            SeedFromJson<Discount>(modelBuilder, "discounts.json");
            SeedFromJson<ProductVariant>(modelBuilder, "variants.json");
            SeedFromJson<ProductSpecificationGroup>(modelBuilder, "groups.json");
            SeedFromJson<ProductSpecification>(modelBuilder, "specifications.json");
            SeedFromJson<ProductImage>(modelBuilder, "product_images.json");

        }

        public static void SeedFromJson<T>(ModelBuilder modelBuilder, string fileName) where T : class
        {
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "Json", fileName);

            if (File.Exists(filePath))
            {
                try
                {
                    string jsonData = File.ReadAllText(filePath);
                    var data = JsonSerializer.Deserialize<List<T>>(jsonData);

                    if (data != null && data.Count > 0)
                    {
                        modelBuilder.Entity<T>().HasData(data);
                        Console.WriteLine($"✅ Seed data thành công cho {typeof(T).Name} từ {fileName}!");
                    }
                    else
                    {
                        Console.WriteLine($"❌ Lỗi: Dữ liệu JSON null hoặc không hợp lệ trong {fileName}!");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"❌ Lỗi khi đọc JSON từ {fileName}: {ex.Message}");
                }
            }
            else
            {
                Console.WriteLine($"❌ File không tồn tại: {filePath}");
            }
        }

        public static void SeedUserFromJson(ModelBuilder modelBuilder, string fileName)
        {
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "Json", fileName);

            if (File.Exists(filePath))
            {
                try
                {
                    string jsonData = File.ReadAllText(filePath);
                    var data = JsonSerializer.Deserialize<List<User>>(jsonData);

                    foreach (var user in data)
                    {
                        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt(12));
                        user.Password = hashedPassword;
                    }

                    if (data != null && data.Count > 0)
                    {
                        modelBuilder.Entity<User>().HasData(data);
                        Console.WriteLine($"✅ Seed data thành công cho {typeof(User).Name} từ {fileName}!");
                    }
                    else
                    {
                        Console.WriteLine($"❌ Lỗi: Dữ liệu JSON null hoặc không hợp lệ trong {fileName}!");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"❌ Lỗi khi đọc JSON từ {fileName}: {ex.Message}");
                }
            }
            else
            {
                Console.WriteLine($"❌ File không tồn tại: {filePath}");
            }
        }
    }
}
