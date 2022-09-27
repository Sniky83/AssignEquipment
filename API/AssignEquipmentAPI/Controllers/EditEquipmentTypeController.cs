using API.Helpers;
using API.Models.EntityDB;
using API.Models.Requests.EditEquipmentType;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EditEquipmentTypeController : ControllerBase
    {
        private readonly MyDbContext _context;

        public EditEquipmentTypeController(MyDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Récupère tous les types équipements au chargement de la page.
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetEquipmentTypes")]
        public IActionResult GetEquipmentTypes()
        {
            var getEquipmentTypes = _context.TypeEquipements.Select(et => new
            {
                IdTypeEquipement = et.IdTypeEquipement,
                Libelle = et.Libelle,
                IsActif = et.IsActif
            }).ToList();

            if(getEquipmentTypes.Count == 0)
            {
                return NotFound(new { message = "Aucun type d'équipement trouvé !" });
            }

            return Ok(getEquipmentTypes);
        }

        /// <summary>
        /// Filtre sur les types équipements.
        /// </summary>
        /// <param name="QueryParams">Contient le Libellé et IsActif.</param>
        /// <returns></returns>
        [HttpGet("GetEquipmentTypes/Filters")]
        public IActionResult GetEquipmentTypesFilters([FromQuery] FiltersEquipmentTypeParameters QueryParams)
        {
            var query = _context.TypeEquipements.Select(et => new
            {
                IdTypeEquipement = et.IdTypeEquipement,
                Libelle = et.Libelle,
                IsActif = et.IsActif
            }).AsQueryable();

            if(!string.IsNullOrEmpty(QueryParams.Libelle))
            {
                query = query.Where(et => et.Libelle.ToLower().Contains(QueryParams.Libelle.ToLower()));
            }

            query = query.Where(et => et.IsActif == QueryParams.IsActif);

            query.ToList();

            if(query.Count() == 0)
            {
                return NotFound(new { message = "Aucun type d'équipement ne correspond à votre recherche !" });
            }

            return Ok(query);
        }

        /// <summary>
        /// Ajout d'un nouveau type équipement en BDD.
        /// </summary>
        /// <param name="BodyParams">Contient le Libellé</param>
        /// <returns></returns>
        [HttpPost("NewEquipmentType")]
        public IActionResult NewEquipmentType([FromBody] NewEquipmentTypeParameters BodyParams)
        {
            if (string.IsNullOrEmpty(BodyParams.Libelle))
            {
                return BadRequest(new { message = "Veuillez saisir un Libellé !" });
            }

            var checkTypeEquipementExists = _context.TypeEquipements.Any(f => f.Libelle == BodyParams.Libelle);

            //Si le type équipement n'existe pas on le créer en BDD.
            if (checkTypeEquipementExists == false)
            {
                var newTypeEquipement = new TypeEquipement();

                newTypeEquipement.Libelle = BodyParams.Libelle;
                newTypeEquipement.IsActif = BodyParams.IsActif;

                _context.TypeEquipements.Add(newTypeEquipement);
                _context.SaveChanges();

                return Ok(new { message = "Le type équipement à bien été ajouté !" });
            }
            else
            {
                //Interdiction d'avoir deux Libellé identiques en BDD.
                return BadRequest(new { message = "Libellé déjà existant. Veuillez en choisir un autre." });
            }
        }

        /// <summary>
        /// Supprime un type équipement en BDD.
        /// </summary>
        /// <param name="BodyParams">Contient l'IdTypeEquipement</param>
        /// <returns></returns>
        [HttpDelete("DeleteEquipmentType")]
        public IActionResult DeleteEquipmentType([FromBody] DeleteEquipmentTypeParameters BodyParams)
        {
            string errorMessage = "Impossible de supprimer ce type d'équipement car il est inexsitant.";

            //Si l'id type équipement n'a pas lieu d'être.
            if (BodyParams.IdTypeEquipement <= 0)
            {
                //Ce n'est censé arriver que si l'utilisateur modifie l'id type équipement à la volée.
                return BadRequest(new { message = errorMessage });
            }

            var checkEquipmentTypeExists = _context.TypeEquipements.FirstOrDefault(et => et.IdTypeEquipement == BodyParams.IdTypeEquipement);

            if(checkEquipmentTypeExists == null)
            {
                return BadRequest(new { message = errorMessage });
            }
            else
            {
                //Règle métier: on ne supprimer pas un Type Equipement s'il est lié a un équipement.
                //Il faudra le rendre inactif.
                var checkEquipmentTypeExistsInEquipment = _context.Equipements.Any(eq => eq.IdTypeEquipement == BodyParams.IdTypeEquipement);

                //Si le type équipement actuel n'est lié a aucun équipement.
                if(checkEquipmentTypeExistsInEquipment == false)
                {
                    //On supprime le type équipement en BDD.
                    _context.TypeEquipements.Remove(checkEquipmentTypeExists);

                    _context.SaveChanges();

                    return Ok(new { message = "Le type d'équipement à bien été supprimé." });
                }
                else
                {
                    //Interdiction de supprimer un type équipement s'il est lié a un équipement.
                    return Conflict(new { message = "Ce type d'équipement est déjà lié à un équipement. Vous devez le rendre inactif." });
                }
            }
        }

        /// <summary>
        /// Met à jour le type équipement sélectionné en BDD.
        /// </summary>
        /// <param name="BodyParams">Contient l'IdTypeEquipement et le Libelle</param>
        /// <returns></returns>
        [HttpPut("UpdateEquipmentType")]
        public IActionResult UpdateEquipmentType([FromBody] UpdateEquipmentTypeParameters BodyParams)
        {
            string errorNoEquipmentType = "Impossible de mettre à jour ce type d'équipement car il est inexsitant.";

            //Si l'id type équipement n'a pas lieu d'être
            if (BodyParams.IdTypeEquipement <= 0)
            {
                //Ce n'est censé arriver que si l'utilisateur modifie l'id à la volée.
                return BadRequest(new { message = errorNoEquipmentType });
            }

            if (string.IsNullOrEmpty(BodyParams.Libelle))
            {
                return BadRequest(new { message = "Veuillez remplir tous les champs !" });
            }

            var currentEquipmentType = _context.TypeEquipements.FirstOrDefault(et => et.IdTypeEquipement == BodyParams.IdTypeEquipement);

            //S'il n'existe pas on renvoie un message d'erreur.
            if (currentEquipmentType == null)
            {
                return BadRequest(new { message = errorNoEquipmentType });
            }
            else
            {
                //On met à jour les champs de la BDD.
                currentEquipmentType.Libelle = BodyParams.Libelle;
                currentEquipmentType.IsActif = BodyParams.IsActif;

                _context.TypeEquipements.Update(currentEquipmentType);
                _context.SaveChanges();

                return Ok(new { message = "Le type équipement a bien été modifié." });
            }
        }
    }
}