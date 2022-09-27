namespace API.Models.Requests.AssignEquipment
{
    /// <summary>
    /// Cette classe sert au filtrage d'une affectation d'équipement.
    /// Elle pointe sur la route /AssignEquipment/GetAssignEquipments/Filters en GET.
    /// </summary>
    public class FiltersAssignEquipmentParameters
    {
        public string? Keyword { get; set; }
        public string? NumeroSerie { get; set; }
    }
}
