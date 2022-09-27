namespace API.Models.Requests.EditEquipmentType
{
    /// <summary>
    /// Cette classe sert à la supression d'un type d'équipement.
    /// Elle pointe sur la route /EditEquipmentType/DeleteEquipmentType en DELETE.
    /// </summary>
    public class DeleteEquipmentTypeParameters
    {
        public int IdTypeEquipement { get; set; }
    }
}
