namespace API.Models.Requests.EditEquipmentType
{
    /// <summary>
    /// Cette classe sert au filtrage d'un type d'équipement.
    /// Elle pointe sur la route /EditEquipmentType/GetEquipmentTypes/Filters en GET.
    /// </summary>
    public class FiltersEquipmentTypeParameters
    {
        public string? Libelle { get; set; }
        public bool? IsActif { get; set; }
    }
}
