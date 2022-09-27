using API.Models.EntityDB;
using API.Helpers;
using API.Models.Requests.Login;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace API.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateParameters BodyParams);
        Collaborateur GetById(int id);
    }

    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly MyDbContext _context;

        public UserService(IOptions<AppSettings> appSettings, MyDbContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        /// <summary>
        /// Fonction qui génère un token JWT dès que l'user valide sa connexion en BDD.
        /// </summary>
        /// <param name="BodyParams">Contient l'Uname et le Pwd.</param>
        /// <returns>Récupère le token JWT</returns>
        public AuthenticateResponse Authenticate(AuthenticateParameters BodyParams)
        {
            var cryptography = new Cryptography();
            //On utilise la fonction de hashage pour comparer le hash en BDD et notre hash généré avec la string du password en clair.
            var user = _context.Collaborateurs.FirstOrDefault(c => c.Uname == BodyParams.Uname && c.Pwd == cryptography.Sha256Hash(BodyParams.Pwd));

            if (user == null)
            {
                return null;
            }

            //Authentification réussie on renvoit le token
            string token = generateJwtToken(user);

            return new AuthenticateResponse(token);
        }

        /// <summary>
        /// On récupère l'id de l'user connecté pour le lier au middleware afin de savoir si l'user est bien connecté.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Collaborateur GetById(int id)
        {
            var user = _context.Collaborateurs.FirstOrDefault(x => x.IdCollaborateur == id);

            if(user == null)
            {
                return null;
            }

            return user;
        }

        /// <summary>
        /// Fonction qui génère un token JWT appelé dans la méthode Authenticate.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        private string generateJwtToken(Collaborateur user)
        {
            //Génère un token qui est valide pendant 7 jours
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                //On stock la ligne de l'user dans le token généré afin de pouvoir le lire côté react et y extraire les informations.
                Subject = new ClaimsIdentity(new[] { new Claim("user", JsonSerializer.Serialize(user)) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}