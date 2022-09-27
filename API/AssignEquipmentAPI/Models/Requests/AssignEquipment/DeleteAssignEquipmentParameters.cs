namespace API.Models.Requests.AssignEquipment
{
    /// <summary>
    /// Cette classe sert à la supression d'une affectation d'équipement.
    /// Elle pointe sur la route /AssignEquipment/DeleteAssignEquipment en DELETE.
    /// </summary>
    public class DeleteAssignEquipmentParameters
    {
        public int IdAffectationEquipement { get; set; }
    }
}
