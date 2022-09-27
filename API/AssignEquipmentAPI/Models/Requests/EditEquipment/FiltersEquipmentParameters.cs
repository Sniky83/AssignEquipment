namespace API.Models.Requests.EditEquipment
{
    /// <summary>
    /// Cette classe sert au filtrage d'un équipement.
    /// Elle pointe sur la route /EditEquipment/GetEquipments/Filters en GET.
    /// </summary>
    public class FiltersEquipmentParameters
    {
        public string? Keyword { get; set; }
        public string? NumeroSerie { get; set; }
    }
}
