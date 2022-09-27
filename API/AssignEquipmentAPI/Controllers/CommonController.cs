using API.Models.EntityDB;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CommonController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CommonController(MyDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Récupère toutes les Fonctions (intitulé de poste) sous forme de liste.
        /// C'est utilisé dans la Home page et dans l'édtion d'un collaborateur.
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetAllFonctions")]
        public IActionResult GetAllFonctions()
        {
            var getAllFonctions = _context.Fonctions.Select(f => new { f.IdFonction, f.Libelle }).ToList();

            if (getAllFonctions.Count == 0)
            {
                return NotFound(new { message = "Aucune fonction n'a été trouvée !" });
            }

            return Ok(getAllFonctions);
        }
    }
}
