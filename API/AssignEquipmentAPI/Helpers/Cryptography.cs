using Microsoft.Extensions.Options;
using System.Security.Cryptography;
using System.Text;

namespace API.Helpers
{
    public class Cryptography
    {
        /// <summary>
        /// Fonction qui permet de hasher un password avec un SALT en SHA256.
        /// </summary>
        /// <param name="value">String du password en clair de l'utilisateur.</param>
        /// <returns></returns>
        public string Sha256Hash(string value)
        {
            string salt = "CcRZI@RT@.HMQfYBMR?fX5px+1oh#Yc=";

            value = salt + value;

            StringBuilder Sb = new StringBuilder();

            using (SHA256 hash = SHA256.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(value));

                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToString();
        }
    }
}
