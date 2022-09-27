namespace API.Models.Requests.EditEquipment
{
    /// <summary>
    /// Cette classe sert à la supression d'un équipement.
    /// Elle pointe sur la route /EditEquipment/DeleteEquipment en DELETE.
    /// </summary>
    public class DeleteEquipmentParameters
    {
        public int IdEquipement { get; set; }
    }
}
