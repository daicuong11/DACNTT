namespace PhoneStoreBackend.Utils
{
    public class GetGmailName
    {
        public static string gmailToName(string gmail)
        {
            var arrayEmail = gmail.Split('@');
            return arrayEmail[0];
        }
    }
}
