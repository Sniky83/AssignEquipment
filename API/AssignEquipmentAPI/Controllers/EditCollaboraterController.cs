using API.Models.EntityDB;
using API.Helpers;
using API.Models.Requests.Common;
using API.Models.Requests.EditCollaborater;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EditCollaboraterController : ControllerBase
    {
        private readonly MyDbContext _context;

        public EditCollaboraterController(MyDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Récupère la liste des collaborateurs au chargement de la page.
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetCollaboraters")]
        public IActionResult GetCollaboraters()
        {
            var getAllCollaborateurs =
                (
                    from c in _context.Collaborateurs
                    join f in _context.Fonctions
                    on c.IdFonction equals f.IdFonction
                    select new
                    {
                        IdCollaborateur = c.IdCollaborateur,
                        Nom = c.Nom,
                        Prenom = c.Prenom,
                        Uname = c.Uname,
                        IsActif = c.IsActif,
                        Fonction = f.Libelle,
                        IdFonction = f.IdFonction
                    }
                ).ToList();

            if (getAllCollaborateurs.Count == 0)
            {
                return NotFound(new { message = "Aucun utilisateur trouvé !" });
            }

            return Ok(getAllCollaborateurs);
        }

        /// <summary>
        /// Récupère le collaborateur sélectionné depuis la Home page.
        /// </summary>
        /// <param name="IdCollaborateur">L'id du collaborateur.</param>
        /// <returns></returns>
        [HttpGet("GetCollaborater")]
        public IActionResult GetCollaborater([FromQuery] int IdCollaborateur)
        {
            var getSingleCollaborateur =
                (
                    from c in _context.Collaborateurs
                    join f in _context.Fonctions
                    on c.IdFonction equals f.IdFonction
                    where c.IdCollaborateur == IdCollaborateur
                    select new
                    {
                        IdCollaborateur = c.IdCollaborateur,
                        Nom = c.Nom,
                        Prenom = c.Prenom,
                        Uname = c.Uname,
                        IsActif = c.IsActif,
                        Fonction = f.Libelle,
                        IdFonction = f.IdFonction
                    }
                ).ToList();

            if (getSingleCollaborateur.Count == 0)
            {
                return NotFound(new { message = "Aucun utilisateur trouvé !" });
            }

            return Ok(getSingleCollaborateur);
        }

        /// <summary>
        /// Cela correspond au filtre sur la page d'édition des collaborateurs.
        /// </summary>
        /// <param name="QueryParams">Contient le Nom, Prenom, IdFonction.</param>
        /// <returns></returns>
        [HttpGet("GetCollaboraters/Filters")]
        public IActionResult GetCollaboratersFilters([FromQuery] CollaboterFiltersParameters QueryParams)
        {
            //On récupère la fonction de pré-filtrage car elle est utilisée plusieurs fois dans le code
            CommonHelper commonHelper = new CommonHelper(_context);
            var query = commonHelper.CollaboraterFilter(QueryParams);

            var getCollaborateurs = query.Select(cf => new
            {
                IdCollaborateur = cf.Collaborateur.IdCollaborateur,
                Nom = cf.Collaborateur.Nom,
                Prenom = cf.Collaborateur.Prenom,
                Uname = cf.Collaborateur.Uname,
                IsActif = cf.Collaborateur.IsActif,
                Fonction = cf.Fonction.Libelle,
                IdFonction = cf.Fonction.IdFonction
            }).ToList();

            if (getCollaborateurs.Count == 0)
            {
                return NotFound(new { message = "Aucun utilisateur ne correspond à votre recherche !" });
            }

            return Ok(getCollaborateurs);
        }

        /// <summary>
        /// Permet l'ajout d'un nouveau collaborateur en BDD.
        /// </summary>
        /// <param name="BodyParams">Contient le Nom, Prenom, Uname, Pwd, IdFonction, IsActif.</param>
        /// <returns></returns>
        [HttpPost("NewCollaborater")]
        public IActionResult NewCollaborater([FromBody] NewCollaboraterParameters BodyParams)
        {
            string emailRegex = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";

            Regex checkEmail = new Regex(emailRegex);

            MatchCollection matches = checkEmail.Matches(BodyParams.Uname);

            if(matches.Count == 0)
            {
                return BadRequest(new { message = "Veuillez remplir un email valide !" });
            }

            //On vérifie que les champs ont bien été remplis.
            if (string.IsNullOrEmpty(BodyParams.Nom) || string.IsNullOrEmpty(BodyParams.Prenom)
                || string.IsNullOrEmpty(BodyParams.Uname) || string.IsNullOrEmpty(BodyParams.Pwd)
                || BodyParams.IdFonction <= 0)
            {
                return BadRequest(new { message = "Veuillez remplir tous les champs !" });
            }

            if (BodyParams.Pwd.Length < 8 || BodyParams.Pwd.Length > 16)
            {
                return BadRequest(new { message = "Le mot de passe saisi doit comporter entre 8 et 16 caractères !" });
            }

            var checkFonctionExists = _context.Fonctions.Any(f => f.IdFonction == BodyParams.IdFonction);

            //On vérifie que la fonction envoyée en paramètre est bien intègre.
            if(checkFonctionExists == false)
            {
                //Ce n'est censé arriver que si l'utilisateur modifie l'id de la fonction à la volée.
                return BadRequest(new { message = "Veuillez sélectionner une fonction !" });
            }

            var checkDoublonUname = _context.Collaborateurs.Any(c => c.Uname == BodyParams.Uname);

            //Si y'a pas de doublons alors on insert.
            if(checkDoublonUname == false)
            {
                var cryptography = new Cryptography();
                var newCollaborateur = new Collaborateur();

                //On remplit les champs de la BDD.
                newCollaborateur.Prenom = BodyParams.Prenom;
                newCollaborateur.Nom = BodyParams.Nom;
                newCollaborateur.Uname = BodyParams.Uname;
                newCollaborateur.IdFonction = BodyParams.IdFonction;
                newCollaborateur.IsActif = BodyParams.IsActif;
                newCollaborateur.Pwd = cryptography.Sha256Hash(BodyParams.Pwd);
                //IdGroupe = 1 : tous les droits (R/W)
                newCollaborateur.IdGroup = 1;
                newCollaborateur.DateCreation = DateTime.Now;

                _context.Collaborateurs.Add(newCollaborateur);
                _context.SaveChanges();

                return Ok(new { message = "Le collaborateur a bien été ajouté." });
            }
            else
            {
                //Interdiction d'avoir deux Uname identiques en BDD.
                return BadRequest(new { message = "Nom d'utilisateur déjà existant. Veuillez en choisir un autre." });
            }
        }

        /// <summary>
        /// Permet la suppression d'un collaborateur en BDD + la désaffectation des équipiments qui lui sont associés.
        /// </summary>
        /// <param name="BodyParams">Contient l'IdCollaborateur.</param>
        /// <returns></returns>
        [HttpDelete("DeleteCollaborater")]
        public IActionResult DeleteCollaborater([FromBody] DeleteCollaboraterParameters BodyParams)
        {
            string errorMessage = "Impossible de supprimer ce collaborateur car il est inexsitant.";

            //Si l'id du collaborateur n'a pas lieu d'être.
            if (BodyParams.IdCollaborateur <= 0)
            {
                //Ce n'est censé arriver que si l'utilisateur modifie l'id de la fonction à la volée.
                return BadRequest(new { message = errorMessage });
            }

            var checkCollaborateurExists = _context.Collaborateurs.FirstOrDefault(c => c.IdCollaborateur == BodyParams.IdCollaborateur);
            var getEquipementsAffectes = _context.AffectationEquipements.Where(ae => ae.IdCollaborateur == BodyParams.IdCollaborateur);

            //S'il n'existe pas on renvoie un message d'erreur.
            if(checkCollaborateurExists == null)
            {
                return BadRequest(new { message = errorMessage });
            }
            else
            {
                if (getEquipementsAffectes == null)
                {
                    //On supprime le collaborateur en BDD.
                    _context.Collaborateurs.Remove(checkCollaborateurExists);

                    _context.SaveChanges();

                    return Ok(new { message = "Le collaborateur a bien été supprimé." });
                }
                else
                {
                    //Si le collab a des affectations lors de sa suppression
                    return Conflict(new { message = "Le collaborateur : <b>" + checkCollaborateurExists.Nom + " " + checkCollaborateurExists.Prenom + "</b> possède des équipements affectés. Veuillez lui désafecter ses équipements pour le supprimer." });
                }
            }
        }

        /// <summary>
        /// Permet la mise à jour des données d'un collaborateur.
        /// </summary>
        /// <param name="BodyParams">Contient l'IdCollaborateur, IdFonction, Nom, Prenom, Uname, Pwd, IsActif.</param>
        /// <returns></returns>
        [HttpPut("UpdateCollaborater")]
        public IActionResult UpdateCollaborater([FromBody] UpdateCollaboraterParameters BodyParams)
        {
            string emailRegex = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";

            Regex checkEmail = new Regex(emailRegex);

            MatchCollection matches = checkEmail.Matches(BodyParams.Uname);

            if (matches.Count == 0)
            {
                return BadRequest(new { message = "Veuillez remplir un email valide !" });
            }

            string errorNoCollab = "Impossible de mettre à jour ce collaborateur car il est inexsitant.";

            //Si l'id du collaborateur et l'idFonction n'ont pas lieu d'être.
            if (BodyParams.IdCollaborateur <= 0)
            {
                //Ce n'est censé arriver que si l'utilisateur modifie l'id de la fonction à la volée.
                return BadRequest(new { message = errorNoCollab });
            }

            string errorNoFonction = "Veuillez sélectionner une fonction !";

            if (BodyParams.IdFonction <= 0)
            {
                return BadRequest(new { message = errorNoFonction });
            }

            //On check que les params soient bien saisis
            if (string.IsNullOrEmpty(BodyParams.Nom) || string.IsNullOrEmpty(BodyParams.Prenom)
                || string.IsNullOrEmpty(BodyParams.Uname))
            {
                return BadRequest(new { message = "Veuillez remplir tous les champs !" });
            }

            if (BodyParams.Pwd?.Length < 8 || BodyParams.Pwd?.Length > 16)
            {
                return BadRequest(new { message = "Le mot de passe saisi doit comporter entre 8 et 16 caractères !" });
            }

            var checkFonctionExists = _context.Fonctions.Any(f => f.IdFonction == BodyParams.IdFonction);

            if(checkFonctionExists == false)
            {
                return BadRequest(new { message = errorNoFonction });
            }

            var currentCollaborateur = _context.Collaborateurs.FirstOrDefault(c => c.IdCollaborateur == BodyParams.IdCollaborateur);

            //S'il n'existe pas on renvoie un message d'erreur.
            if (currentCollaborateur == null)
            {
                return BadRequest(new { message = errorNoCollab });
            }
            else
            {
                var cryptography = new Cryptography();

                //On met à jour les champs de la BDD.
                currentCollaborateur.Prenom = BodyParams.Prenom;
                currentCollaborateur.Nom = BodyParams.Nom;
                currentCollaborateur.Uname = BodyParams.Uname;
                currentCollaborateur.IdFonction = BodyParams.IdFonction;
                currentCollaborateur.IsActif = BodyParams.IsActif;

                if(!string.IsNullOrEmpty(BodyParams.Pwd))
                {
                    currentCollaborateur.Pwd = cryptography.Sha256Hash(BodyParams.Pwd);
                }

                _context.Collaborateurs.Update(currentCollaborateur);
                _context.SaveChanges();

                return Ok(new { message = "Le collaborateur a bien été modifié." });
            }
        }
    }
}
