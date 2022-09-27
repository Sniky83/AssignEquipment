using System.ComponentModel.DataAnnotations;

namespace API.Models.Requests.EditCollaborater
{
    /// <summary>
    /// Cette classe sert à la création d'un nouveau collaborateur dans la page EditCollaborater.
    /// Elle pointe sur la route /EditCollaborater/NewCollaborater en POST.
    /// </summary>
    public class NewCollaboraterParameters
    {
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public int IdFonction { get; set; }
        public string Uname { get; set; }
        public string Pwd { get; set; }
        public bool IsActif { get; set; }
    }
}
