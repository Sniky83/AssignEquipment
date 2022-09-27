namespace API.Models.Requests.EditEquipmentType
{
    /// <summary>
    /// Cette classe sert à la modification d'un type d'équipement dans la page EditEquipmentType.
    /// Elle pointe sur la route /EditEquipmentType/UpdateEquipmentType en PUT.
    /// </summary>
    public class UpdateEquipmentTypeParameters
    {
        public int IdTypeEquipement { get; set; }
        public string Libelle { get; set; }
        public bool IsActif { get; set; }
    }
}
