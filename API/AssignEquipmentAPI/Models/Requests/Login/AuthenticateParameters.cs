namespace API.Models.Requests.Login
{
    /// <summary>
    /// Cette classe sert au Login d'un utilisateur.
    /// Elle pointe sur la route /Login/Authenticate en POST.
    /// </summary>
    public class AuthenticateParameters
    {
        public string Uname { get; set; }
        public string Pwd { get; set; }
    }
}
