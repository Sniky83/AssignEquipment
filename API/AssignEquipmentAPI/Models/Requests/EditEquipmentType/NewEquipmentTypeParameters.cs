namespace API.Models.Requests.EditEquipmentType
{
    /// <summary>
    /// Cette classe sert à la création d'un nouveau type d'équipement dans la page EditEquipmentType.
    /// Elle pointe sur la route /EditEquipmentType/NewEquipmentType en POST.
    /// </summary>
    public class NewEquipmentTypeParameters
    {
        public string Libelle { get; set; }
        public bool IsActif { get; set; }
    }
}
