using API.Helpers;
using API.Models.EntityDB;
using API.Models.Requests.AssignEquipment;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AssignEquipmentController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AssignEquipmentController(MyDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Récupère tous les équipements affectés.
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetAssignEquipments")]
        public IActionResult GetAssignEquipments()
        {
            //Triple jointure pour récupérer les équipements liés aux collaborateurs
            var getAssignEquipments =
            (
                from ae in _context.AffectationEquipements
                join e in _context.Equipements
                    on ae.IdEquipement equals e.IdEquipement
                join c in _context.Collaborateurs
                    on ae.IdCollaborateur equals c.IdCollaborateur
                join te in _context.TypeEquipements
                    on e.IdTypeEquipement equals te.IdTypeEquipement
                where
                    ae.IsActif == true
                select new
                {
                    IdAffectationEquipement = ae.IdAffectationEquipement,
                    IdEquipement = ae.IdEquipement,
                    IdCollaborateur = ae.IdCollaborateur,
                    DateCreation = ae.DateCreation,
                    Libelle = te.Libelle,
                    Marque = e.Marque,
                    Modele = e.Modele,
                    NumeroSerie = e.NumeroSerie,
                    Nom = c.Nom,
                    Prenom = c.Prenom
                }
            ).ToList();

            if (getAssignEquipments.Count == 0)
            {
                return NotFound(new { message = "Aucun équipement n'est affecté à un collaborateur !" });
            }

            return Ok(getAssignEquipments);
        }

        /// <summary>
        /// Récupère tous les équipements affectés.
        /// </summary>
        /// /// <param name="QueryParams">Contient le Keyword et le numéro de série.</param>
        /// <returns></returns>
        [HttpGet("GetAssignEquipments/Filters")]
        public IActionResult GetAssignEquipmentsFilters([FromQuery] FiltersAssignEquipmentParameters QueryParams)
        {
            //Triple jointure pour récupérer les équipements liés aux collaborateurs
            var query =
            (
                from ae in _context.AffectationEquipements
                join e in _context.Equipements
                    on ae.IdEquipement equals e.IdEquipement
                join c in _context.Collaborateurs
                    on ae.IdCollaborateur equals c.IdCollaborateur
                join te in _context.TypeEquipements
                    on e.IdTypeEquipement equals te.IdTypeEquipement
                where
                    ae.IsActif == true
                select new
                {
                    IdAffectationEquipement = ae.IdAffectationEquipement,
                    IdEquipement = ae.IdEquipement,
                    IdCollaborateur = ae.IdCollaborateur,
                    DateCreation = ae.DateCreation,
                    Libelle = te.Libelle,
                    Marque = e.Marque,
                    Modele = e.Modele,
                    NumeroSerie = e.NumeroSerie,
                    Nom = c.Nom,
                    Prenom = c.Prenom
                }
            ).AsQueryable();

            if (!string.IsNullOrEmpty(QueryParams.Keyword))
            {
                query = query.Where(
                    all =>
                        all.Nom.ToLower().Contains(QueryParams.Keyword.ToLower()) ||
                        all.Prenom.ToLower().Contains(QueryParams.Keyword.ToLower()) ||
                        all.Libelle.ToLower().Contains(QueryParams.Keyword.ToLower()) ||
                        all.Marque.ToLower().Contains(QueryParams.Keyword.ToLower()) ||
                        all.Modele.ToLower().Contains(QueryParams.Keyword.ToLower())
                );
            }

            if (!string.IsNullOrEmpty(QueryParams.NumeroSerie))
            {
                query = query.Where(et => et.NumeroSerie.ToLower().Contains(QueryParams.NumeroSerie.ToLower()));
            }

            query.ToList();

            if (query.Count() == 0)
            {
                return NotFound(new { message = "Aucune affectation ne correspond à votre recherche !" });
            }

            return Ok(query);
        }

        /// <summary>
        /// Récupère tous les équipements non affectés.
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetNonAssignedEquipments")]
        public IActionResult GetNonAssignedEquipments()
        {
            //On récupère les équipements non affectés
            var getEquipmentsNonAssigned =
            (
                from e in _context.Equipements
                join te in _context.TypeEquipements
                    on e.IdTypeEquipement equals te.IdTypeEquipement
                where
                    !(from ae in _context.AffectationEquipements
                      where ae.IsActif == true
                      select ae.IdEquipement)
                    .Contains(e.IdEquipement) 
                select new
                {
                    IdEquipement = e.IdEquipement,
                    Libelle = te.Libelle,
                    Marque = e.Marque,
                    Modele = e.Modele,
                    NumeroSerie = e.NumeroSerie
                }
            ).ToList();

            //Je ne retourne pas de message pour le moment car compliqué à mettre en place et pas forcément necessaire
            /*if (getEquipmentsNonAssigned.Count == 0)
            {
                return NotFound(new { message = "Aucun équipement n'est disponible ! Veuillez en créer un nouveau ou supprimer une affectation." });
            }*/

            return Ok(getEquipmentsNonAssigned);
        }

        /// <summary>
        /// Ajout d'une nouvelle affectation en BDD.
        /// </summary>
        /// <param name="BodyParams">Contient l'IdEquipement et l'IdCollaborateur.</param>
        /// <returns></returns>
        [HttpPost("NewAssignEquipment")]
        public IActionResult NewAssignEquipment([FromBody] NewAssignEquipmentParameters BodyParams)
        {
            if (BodyParams.IdCollaborateur <= 0)
            {
                return BadRequest(new { message = "Veuillez sélectionner un collaborateur !" });
            }

            if (BodyParams.IdEquipement <= 0)
            {
                return BadRequest(new { message = "Veuillez sélectionner un équipement !" });
            }

            var checkEquipementExists = _context.Equipements.Any(e => e.IdEquipement == BodyParams.IdEquipement);

            //Si l'équipement n'existe pas
            if (checkEquipementExists == false)
            {
                return BadRequest(new { message = "Veuillez sélectionner un équipement existant !" });
            }

            var checkCollaborateurExists = _context.Collaborateurs.Any(e => e.IdCollaborateur == BodyParams.IdCollaborateur);

            //Si le collaborateur n'existe pas
            if (checkCollaborateurExists == false)
            {
                return BadRequest(new { message = "Veuillez sélectionner un collaborateur existant !" });
            }

            //On cherche à savoir si l'idEquipement lors de l'affectation existe ou non.
            var checkAffectationEquipementExists = _context.AffectationEquipements.Any(
                ae => ae.IdEquipement == BodyParams.IdEquipement
            );

            //Si l'affectation n'existe pas on l'a créee en BDD.
            if (checkAffectationEquipementExists == false)
            {
                var newAssignEquipement = new AffectationEquipement();

                newAssignEquipement.IdCollaborateur = BodyParams.IdCollaborateur;
                newAssignEquipement.IdEquipement = BodyParams.IdEquipement;
                newAssignEquipement.IsActif = true;
                newAssignEquipement.DateCreation = DateTime.Now;

                _context.AffectationEquipements.Add(newAssignEquipement);
                _context.SaveChanges();

                return Ok(new { message = "L'équipement a bien été affecté !" });
            }
            else
            {
                //Interdiction d'avoir un doublon pour le même équipement.
                return BadRequest(new { message = "Cet équipement est déjà attribué. Veuillez en choisir un autre." });
            }
        }

        /// <summary>
        /// Supprime un affectation en BDD.
        /// </summary>
        /// <param name="BodyParams">Contient l'IdAffectationEquipement</param>
        /// <returns></returns>
        [HttpDelete("DeleteAssignEquipment")]
        public IActionResult DeleteAssignEquipment([FromBody] DeleteAssignEquipmentParameters BodyParams)
        {
            string errorMessage = "Impossible de supprimer cette affectation car elle est inexsitante.";

            //Si l'id affectation n'a pas lieu d'être.
            if (BodyParams.IdAffectationEquipement <= 0)
            {
                //Ce n'est censé arriver que si l'utilisateur modifie l'id à la volée.
                return BadRequest(new { message = errorMessage });
            }

            var currentAssignEquipmentExists = _context.AffectationEquipements.FirstOrDefault(eq => eq.IdAffectationEquipement == BodyParams.IdAffectationEquipement);

            //Si l'idAffecationEquipement est inexistant en BDD.
            if (currentAssignEquipmentExists == null)
            {
                return BadRequest(new { message = errorMessage });
            }
            else
            {
                //On rend inactif l'affectation
                currentAssignEquipmentExists.IsActif = false;

                //On update l'affectation en BDD.
                _context.AffectationEquipements.Update(currentAssignEquipmentExists);
                _context.SaveChanges();

                return Ok(new { message = "L'affectation a bien été supprimée." });
            }
        }

        /// <summary>
        /// Met à jour une affectation en BDD en inserant une nouvelle ligne pour garder les logs de la table vu qu'elle sert d'historique.
        /// </summary>
        /// <param name="BodyParams">Contient l'IdEquipement, l'IdCollaborateur et l'OldIdEquipement</param>
        /// <returns></returns>
        [HttpPut("UpdateAssignEquipment")]
        public IActionResult UpdateAssignEquipment([FromBody] UpdateAssignEquipmentParameters BodyParams)
        {
            if (BodyParams.IdCollaborateur <= 0)
            {
                return BadRequest(new { message = "Veuillez sélectionner un collaborateur !" });
            }

            if (BodyParams.IdEquipement <= 0)
            {
                return BadRequest(new { message = "Veuillez sélectionner un équipement !" });
            }

            var checkEquipementExists = _context.Equipements.Any(e => e.IdEquipement == BodyParams.IdEquipement);

            //Si l'équipement n'existe pas
            if (checkEquipementExists == false)
            {
                return BadRequest(new { message = "Veuillez sélectionner un équipement existant !" });
            }

            var checkCollaborateurExists = _context.Collaborateurs.Any(e => e.IdCollaborateur == BodyParams.IdCollaborateur);

            //Si le collaborateur n'existe pas
            if (checkCollaborateurExists == false)
            {
                return BadRequest(new { message = "Veuillez sélectionner un collaborateur existant !" });
            }

            //On cherche à savoir si l'idEquipement lors de l'affectation existe ou non.
            var currentAffectationEquipementExists = _context.AffectationEquipements.FirstOrDefault(
                ae => ae.IdEquipement == BodyParams.OldIdEquipement && ae.IsActif == true
            );

            //Si l'affectation existe on l'a met à jour en BDD.
            if (currentAffectationEquipementExists != null)
            {
                currentAffectationEquipementExists.IsActif = false;

                //On update l'affectation en BDD.
                _context.AffectationEquipements.Update(currentAffectationEquipementExists);
                _context.SaveChanges();

                var newAssignEquipement = new AffectationEquipement();

                newAssignEquipement.IdCollaborateur = BodyParams.IdCollaborateur;
                newAssignEquipement.IdEquipement = BodyParams.IdEquipement;
                newAssignEquipement.IsActif = true;
                newAssignEquipement.DateCreation = DateTime.Now;

                //Une fois avoir update l'élément précédent on INSERT la nouvelle affectation.
                _context.AffectationEquipements.Add(newAssignEquipement);
                _context.SaveChanges();

                return Ok(new { message = "L'équipement a bien été affecté !" });
            }
            else
            {
                //Interdiction d'avoir un doublon pour le même équipement.
                return BadRequest(new { message = "Cet équipement est déjà attribué. Veuillez en choisir un autre." });
            }
        }
    }
}
