namespace API.Models.Requests.EditCollaborater
{
    /// <summary>
    /// Cette classe sert à la modification d'un collaborateur dans la page EditCollaborater.
    /// Elle pointe sur la route /EditCollaborater/UpdateCollaborater en PUT.
    /// </summary>
    public class UpdateCollaboraterParameters
    {
        public int IdCollaborateur { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public int IdFonction { get; set; }
        public string Uname { get; set; }
        public string? Pwd { get; set; }
        public bool IsActif { get; set; }
    }
}
