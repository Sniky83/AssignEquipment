using API.Helpers;
using API.Models.EntityDB;
using API.Models.Requests.EditEquipment;
using API.Models.Requests.EditEquipmentType;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EditEquipmentController : ControllerBase
    {
        private readonly MyDbContext _context;

        public EditEquipmentController(MyDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Récupère tous les équipements au chargement de la page.
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetEquipments")]
        public IActionResult GetEquipments()
        {
            var getEquipments =
            (
                from eq in _context.Equipements
                join et in _context.TypeEquipements
                on eq.IdTypeEquipement equals et.IdTypeEquipement
                select new
                {
                    IdEquipement = eq.IdEquipement,
                    IdTypeEquipement = eq.IdTypeEquipement,
                    Marque = eq.Marque,
                    Modele = eq.Modele,
                    NumeroSerie = eq.NumeroSerie,
                    Commentaire = eq.Commentaire,
                    DateCreation = eq.DateCreation,
                    Libelle = et.Libelle
                }
            ).ToList();

            if (getEquipments.Count == 0)
            {
                return NotFound(new { message = "Aucun équipement trouvé !" });
            }

            return Ok(getEquipments);
        }

        /// <summary>
        /// Récupère l'équipement sélectionné depuis la Home page.
        /// </summary>
        /// <param name="IdEquipement">L'id de l'équipement.</param>
        /// <returns></returns>
        [HttpGet("GetEquipment")]
        public IActionResult GetEquipment([FromQuery] int IdEquipement)
        {
            var getEquipments =
            (
                from eq in _context.Equipements
                join et in _context.TypeEquipements
                on eq.IdTypeEquipement equals et.IdTypeEquipement
                where eq.IdEquipement == IdEquipement
                select new
                {
                    IdEquipement = eq.IdEquipement,
                    IdTypeEquipement = eq.IdTypeEquipement,
                    Marque = eq.Marque,
                    Modele = eq.Modele,
                    NumeroSerie = eq.NumeroSerie,
                    Commentaire = eq.Commentaire,
                    DateCreation = eq.DateCreation,
                    Libelle = et.Libelle
                }
            ).ToList();

            if (getEquipments.Count == 0)
            {
                return NotFound(new { message = "Aucun équipement trouvé !" });
            }

            return Ok(getEquipments);
        }

        /// <summary>
        /// Filtre sur les équipements.
        /// </summary>
        /// <param name="QueryParams">Contient le Keyword et le numéro de série.</param>
        /// <returns></returns>
        [HttpGet("GetEquipments/Filters")]
        public IActionResult GetEquipmentsFilters([FromQuery] FiltersEquipmentParameters QueryParams)
        {
            var query =
            (
                from eq in _context.Equipements
                join et in _context.TypeEquipements
                on eq.IdTypeEquipement equals et.IdTypeEquipement
                select new
                {
                    IdEquipement = eq.IdEquipement,
                    IdTypeEquipement = eq.IdTypeEquipement,
                    Marque = eq.Marque,
                    Modele = eq.Modele,
                    NumeroSerie = eq.NumeroSerie,
                    Commentaire = eq.Commentaire,
                    DateCreation = eq.DateCreation,
                    Libelle = et.Libelle
                }
            ).AsQueryable();

            if(!string.IsNullOrEmpty(QueryParams.Keyword))
            {
                query = query.Where(
                    all =>
                        all.Libelle.ToLower().Contains(QueryParams.Keyword.ToLower()) ||
                        all.Marque.ToLower().Contains(QueryParams.Keyword.ToLower()) ||
                        all.Modele.ToLower().Contains(QueryParams.Keyword.ToLower())
                );
            }

            if(!string.IsNullOrEmpty(QueryParams.NumeroSerie))
            {
                query = query.Where(et => et.NumeroSerie.ToLower().Contains(QueryParams.NumeroSerie.ToLower()));
            }

            query.ToList();

            if (query.Count() == 0)
            {
                return NotFound(new { message = "Aucun équipement ne correspond à votre recherche !" });
            }

            return Ok(query);
        }

        /// <summary>
        /// Récupère tous les types équipements actifs au chargement de la page.
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetEquipmentTypes")]
        public IActionResult GetEquipmentTypes()
        {
            var getEquipmentTypes = _context.TypeEquipements.Where(et => et.IsActif == true).Select(et => new { et.IdTypeEquipement, et.Libelle }).ToList();

            if (getEquipmentTypes.Count == 0)
            {
                return NotFound(new { message = "Aucun type d'équipement n'est existant !" });
            }

            return Ok(getEquipmentTypes);
        }

        /// <summary>
        /// Ajout d'un nouveau équipement en BDD.
        /// </summary>
        /// <param name="BodyParams">Contient l'IdTypeEquipement, la marque, le modèle, le numéro de série, un commentaire.</param>
        /// <returns></returns>
        [HttpPost("NewEquipment")]
        public IActionResult NewEquipment([FromBody] NewEquipmentParameters BodyParams)
        {
            if (string.IsNullOrEmpty(BodyParams.Marque) || string.IsNullOrEmpty(BodyParams.Modele)
                || string.IsNullOrEmpty(BodyParams.NumeroSerie))
            {
                return BadRequest(new { message = "Veuillez remplir tous les champs obligatoires !" });
            }

            if(BodyParams.IdTypeEquipement <= 0)
            {
                return BadRequest(new { message = "Veuillez sélectionner un type d'équipement !" });
            }

            var checkTypeEquipementExists = _context.TypeEquipements.Any(te => te.IdTypeEquipement == BodyParams.IdTypeEquipement);

            //Si le type d'équipement n'existe pas
            if(checkTypeEquipementExists == false)
            {
                return BadRequest(new { message = "Veuillez sélectionner un type d'équipement existant !" });
            }

            //Règle métier: pas de doublon sur le numéro de série sur le même IdTypeEquipement.
            var checkEquipementExists = _context.Equipements.Any(
                e => e.NumeroSerie == BodyParams.NumeroSerie && e.IdTypeEquipement == BodyParams.IdTypeEquipement
            );

            //Si l'équipement n'existe pas on le créer en BDD.
            if (checkEquipementExists == false)
            {
                var newEquipement = new Equipement();

                newEquipement.IdTypeEquipement = BodyParams.IdTypeEquipement;
                newEquipement.Marque = BodyParams.Marque;
                newEquipement.Modele = BodyParams.Modele;
                newEquipement.NumeroSerie = BodyParams.NumeroSerie;
                newEquipement.Commentaire = BodyParams.Commentaire;
                newEquipement.DateCreation = DateTime.Now;

                _context.Equipements.Add(newEquipement);
                _context.SaveChanges();

                return Ok(new { message = "L'équipement a bien été ajouté !" });
            }
            else
            {
                //Interdiction d'avoir deux Numéro de série identiques en BDD sur le même IdTypeEquipement.
                return BadRequest(new { message = "Numéro de série déjà existant pour ce type d'équipement. Veuillez en choisir un autre." });
            }
        }

        /// <summary>
        /// Supprime un équipement en BDD.
        /// </summary>
        /// <param name="BodyParams">Contient l'IdEquipement</param>
        /// <returns></returns>
        [HttpDelete("DeleteEquipment")]
        public IActionResult DeleteEquipment([FromBody] DeleteEquipmentParameters BodyParams)
        {
            string errorMessage = "Impossible de supprimer cet équipement car il est inexsitant.";

            //Si l'id équipement n'a pas lieu d'être.
            if (BodyParams.IdEquipement <= 0)
            {
                //Ce n'est censé arriver que si l'utilisateur modifie l'id type équipement à la volée.
                return BadRequest(new { message = errorMessage });
            }

            var checkEquipmentExists = _context.Equipements.FirstOrDefault(eq => eq.IdEquipement == BodyParams.IdEquipement);

            if (checkEquipmentExists == null)
            {
                return BadRequest(new { message = errorMessage });
            }
            else
            {
                //Règle métier: on ne supprimer pas un Equipement s'il est lié a un Collaborateur.
                //Il faudra le rendre inactif.
                var checkAffectationExists = _context.AffectationEquipements.Any(eq => eq.IdEquipement == BodyParams.IdEquipement);

                //Si le type équipement actuel n'est lié a aucun équipement.
                if (checkAffectationExists == false)
                {
                    //On supprime le type équipement en BDD.
                    _context.Equipements.Remove(checkEquipmentExists);

                    _context.SaveChanges();

                    return Ok(new { message = "L'équipement a bien été supprimé." });
                }
                else
                {
                    //Cette requete récupère le nom et prénom du collaborateur qui est lié a l'équipement
                    //On effectue une sous requete sur la table AffectationEquipements sur l'idEquipement
                    //On récupère ensuite l'id du collaborateur via cette sous requete pour l'injecter dans le where
                    var getCurrentIdCollaborater = _context.Collaborateurs
                        .Where(col => col.IdCollaborateur ==
                            (_context.AffectationEquipements
                            .Where(aff => aff.IdEquipement == BodyParams.IdEquipement)
                            .Select(aff => aff.IdCollaborateur)
                            .FirstOrDefault()
                        )).Select(col => new { col.Nom, col.Prenom }).FirstOrDefault();

                    if (getCurrentIdCollaborater != null)
                    {
                        //Interdiction de supprimer un équipement s'il est lié a un Collaborateur.
                        return Conflict(new { message = "Cet équipement est déjà lié à : <b>" + getCurrentIdCollaborater.Nom + " " + getCurrentIdCollaborater.Prenom + "</b>. Vous devez le désafecter pour pouvoir le supprimer." });
                    }
                    else
                    {
                        //Si on ne parvient pas a remonter l'id collaborateur (ne devrait pas arriver).
                        return BadRequest(new { message = "Impossible de trouver le collaborateur lié à cet équipement." });
                    }
                }
            }
        }

        /// <summary>
        /// Met à jour un équipement sélectionné en BDD.
        /// </summary>
        /// <param name="BodyParams">Contient l'IdEquipement, l'IdTypeEquipement, la marque, le modèle, le numéro de série et un commentaire.</param>
        /// <returns></returns>
        [HttpPut("UpdateEquipment")]
        public IActionResult UpdateEquipmentType([FromBody] UpdateEquipmentParameters BodyParams)
        {
            string errorNoEquipment = "Impossible de mettre à jour cet équipement car il est inexsitant.";

            //Si l'id type équipement n'a pas lieu d'être
            if (BodyParams.IdTypeEquipement <= 0)
            {
                //Ce n'est censé arriver que si l'utilisateur modifie l'id à la volée.
                return BadRequest(new { message = "Veuillez sélectionner un type d'équipement !" });
            }

            //Si l'id équipement n'a pas lieu d'être
            if (BodyParams.IdEquipement <= 0)
            {
                //Ce n'est censé arriver que si l'utilisateur modifie l'id à la volée.
                return BadRequest(new { message = errorNoEquipment });
            }

            if (string.IsNullOrEmpty(BodyParams.Marque) || string.IsNullOrEmpty(BodyParams.Modele)
                || string.IsNullOrEmpty(BodyParams.NumeroSerie))
            {
                return BadRequest(new { message = "Veuillez remplir tous les champs obligatoires !" });
            }

            var currentEquipment = _context.Equipements.FirstOrDefault(eq => eq.IdEquipement == BodyParams.IdEquipement);

            //S'il n'existe pas on renvoie un message d'erreur.
            if (currentEquipment == null)
            {
                return BadRequest(new { message = errorNoEquipment });
            }
            else
            {
                //On met à jour les champs de la BDD.
                currentEquipment.IdTypeEquipement = BodyParams.IdTypeEquipement;
                currentEquipment.Marque = BodyParams.Marque;
                currentEquipment.Modele = BodyParams.Modele;
                currentEquipment.NumeroSerie = BodyParams.NumeroSerie;
                currentEquipment.Commentaire = BodyParams.Commentaire;

                _context.Equipements.Update(currentEquipment);
                _context.SaveChanges();

                return Ok(new { message = "L'équipement a bien été modifié." });
            }
        }
    }
}
