namespace API.Models.Requests.Common
{
    /// <summary>
    /// Cette classe sert au filtrage d'un collaborateur depuis la Home page.
    /// Elle pointe sur la route /Home/GetCollaboratersFilters en GET.
    /// </summary>
    public class CollaboterFiltersParameters
    {
        public string? Keyword { get; set; }
        public int? IdFonction { get; set; }
        public bool? IsActif { get; set; }
    }
}
