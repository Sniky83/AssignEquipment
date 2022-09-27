using API.Models.EntityDB;

namespace API.Models.Requests.Common
{
    /// <summary>
    /// Cette classe correspond à la jointure des collaborateurs vers la fonction qui leur est associé.
    /// Elle renvoit deux objets de type : Collaborateur et Fonction.
    /// </summary>
    public class CollaboraterFiltersResponse
    {
        public Collaborateur Collaborateur { get; set; }
        public Fonction Fonction { get; set; }
        public CollaboraterFiltersResponse(Collaborateur collaborateur, Fonction fonction)
        {
            Collaborateur = collaborateur;
            Fonction = fonction;
        }
    }
}
