using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Helpers
{
    public static class ProductSpecificationHelper
    {
        public static string GetSpecificationValue(ICollection<ProductSpecification> specifications, params string[] keys)
        {
            // Chuyển danh sách sang Dictionary để tra cứu nhanh hơn
            var specDict = specifications.ToDictionary(s => s.Key, s => s.Value, StringComparer.OrdinalIgnoreCase);

            // Duyệt qua danh sách keys để tìm giá trị phù hợp
            foreach (var key in keys)
            {
                if (specDict.TryGetValue(key, out string value))
                {
                    return value;
                }
            }

            return ""; // Không tìm thấy thì trả về chuỗi rỗng
        }
    }
}
