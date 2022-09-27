namespace API.Models.Requests.EditCollaborater
{
    /// <summary>
    /// Cette classe sert à la supression d'un collaborateur.
    /// Elle pointe sur la route /EditCollaborater/DeleteCollaborater en DELETE.
    /// </summary>
    public class DeleteCollaboraterParameters
    {
        public int IdCollaborateur { get; set; }
    }
}
