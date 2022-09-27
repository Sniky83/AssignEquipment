namespace API.Models.Requests.Login
{
    /// <summary>
    /// Cette classe sert au Login d'un utilisateur.
    /// Elle pointe sur la route /Login/Authenticate en POST.
    /// Elle retourne le token de l'utilisateur si la connexion est validée.
    /// </summary>
    public class AuthenticateResponse
    {
        public string Token { get; set; }

        public AuthenticateResponse(string token)
        {
            Token = token;
        }
    }
}
