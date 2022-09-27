namespace API.Models.Requests.AssignEquipment
{
    /// <summary>
    /// Cette classe sert à la modification d'une affectation d'équipement dans la page AssignEquipment.
    /// Elle pointe sur la route /AssignEquipment/UpdateAssignEquipment en PUT.
    /// </summary>
    public class UpdateAssignEquipmentParameters
    {
        public int IdCollaborateur { get; set; }
        public int IdEquipement { get; set; }
        public int OldIdEquipement { get; set; }
    }
}
