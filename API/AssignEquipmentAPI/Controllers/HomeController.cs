using API.Models.EntityDB;
using API.Helpers;
using API.Models.Requests.Common;
using Microsoft.AspNetCore.Mvc;
using API.Models.Requests.Home;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly MyDbContext _context;

        public HomeController(MyDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Cela correspond au point d'entrée de l'application une fois connecté donc la page d'acceuil.
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetCollaboraters")]
        public IActionResult GetCollaboraters()
        {
            var getCollaborateurs =
                (
                    from c in _context.Collaborateurs
                    join f in _context.Fonctions
                    on c.IdFonction equals f.IdFonction
                    where c.IsActif == true
                    select new
                    {
                        IdCollaborateur = c.IdCollaborateur,
                        Nom = c.Nom,
                        Prenom = c.Prenom,
                        Uname = c.Uname,
                        Fonction = f.Libelle
                    }
                ).ToList();

            if (getCollaborateurs.Count == 0)
            {
                return NotFound(new { message = "Aucun utilisateur trouvé !" });
            }

            return Ok(getCollaborateurs);
        }

        /// <summary>
        /// Récupère la liste des équipements d'un collaborateur au chargement de la page.
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetEquipmentsCollaborater")]
        public IActionResult GetEquipmentsCollaborater([FromQuery] GetEquipmentsParameters QueryParam)
        {
            var getAllEquipmentsCollaborater =
                (
                    from e in _context.Equipements
                    join te in _context.TypeEquipements
                    on e.IdTypeEquipement equals te.IdTypeEquipement
                    join ae in _context.AffectationEquipements
                    on e.IdEquipement equals ae.IdEquipement
                    where ae.IdCollaborateur == QueryParam.IdCollaborateur
                    && ae.IsActif == true
                    select new
                    {
                        IdEquipement = e.IdEquipement,
                        Marque = e.Marque,
                        Modele = e.Modele,
                        NumeroSerie = e.NumeroSerie,
                        Commentaire = e.Commentaire,
                        DateCreation = e.DateCreation,
                        Libelle = te.Libelle
                    }
                ).ToList();

            if (getAllEquipmentsCollaborater.Count == 0)
            {
                return NotFound(new { message = "Aucun équipement trouvé pour ce collaborateur !" });
            }

            return Ok(getAllEquipmentsCollaborater);
        }

        /// <summary>
        /// Cela correspond au filtre sur la page d'acceuil.
        /// </summary>
        /// <param name="QueryParams">Contient le Keyword et l'IdFonction.</param>
        /// <returns></returns>
        [HttpGet("GetCollaboraters/Filters")]
        public IActionResult GetCollaboratersFilters([FromQuery] CollaboterFiltersParameters QueryParams)
        {
            //On récupère la fonction de pré-filtrage car elle est utilisée plusieurs fois dans le code
            CommonHelper commonHelper = new CommonHelper(_context);
            var query = commonHelper.CollaboraterFilter(QueryParams, true);

            var getCollaborateurs = query.Select(cf => new {
                IdCollaborateur = cf.Collaborateur.IdCollaborateur,
                Nom = cf.Collaborateur.Nom,
                Prenom = cf.Collaborateur.Prenom,
                Uname = cf.Collaborateur.Uname,
                Fonction = cf.Fonction.Libelle
            }).ToList();

            if (getCollaborateurs.Count == 0)
            {
                return NotFound(new { message = "Aucun utilisateur ne correspond à votre recherche !" });
            }

            return Ok(getCollaborateurs);
        }
    }
}
