namespace API.Models.Requests.AssignEquipment
{
    /// <summary>
    /// Cette classe sert à la création d'une nouvelle affectation d'équipement dans la page AssignEquipment.
    /// Elle pointe sur la route /AssignEquipment/NewAssignEquipment en POST.
    /// </summary>
    public class NewAssignEquipmentParameters
    {
        public int IdEquipement { get; set; }
        public int IdCollaborateur { get; set; }
    }
}
