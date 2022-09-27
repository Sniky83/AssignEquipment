using Microsoft.AspNetCore.Mvc;
using API.Services;
using API.Models.Requests.Login;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IUserService _userService;

        public LoginController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// On s'occupe ici de vérifier la connexion utilisateur avec 2 paramètres qui sont : l'username et le password.
        /// </summary>
        /// <param name="BodyParams">Contient l'Uname et le Pwd.</param>
        /// <returns></returns>
        [HttpPost("Authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateParameters BodyParams)
        {
            if (string.IsNullOrEmpty(BodyParams.Uname) && string.IsNullOrEmpty(BodyParams.Pwd))
            {
                return BadRequest(new { message = "Le Nom d'utilisateur ou le mot de passe est manquant !" });
            }

            if(BodyParams.Pwd.Length < 8 || BodyParams.Pwd.Length > 16)
            {
                return BadRequest(new { message = "Le mot de passe saisi doit comporter entre 8 et 16 caractères !" });
            }

            var token = _userService.Authenticate(BodyParams);

            if (token == null)
            {
                return NotFound(new { message = "Nom d'utilisateur ou mot de passe incorrect !" });
            }

            return Ok(token);
        }
    }
}
