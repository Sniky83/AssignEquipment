namespace API.Models.Requests.EditEquipment
{
    /// <summary>
    /// Cette classe sert à la modification d'un équipement dans la page EditEquipment.
    /// Elle pointe sur la route /EditEquipment/UpdateEquipment en PUT.
    /// </summary>
    public class UpdateEquipmentParameters
    {
        public int IdEquipement { get; set; }
        public int IdTypeEquipement { get; set; }
        public string Marque { get; set; }
        public string Modele { get; set; }
        public string NumeroSerie { get; set; }
        public string? Commentaire { get; set; }
    }
}
