namespace API.Models.Requests.EditEquipment
{
    /// <summary>
    /// Cette classe sert à la création d'un nouvel équipement dans la page EditEquipment.
    /// Elle pointe sur la route /EditEquipment/NewEquipment en POST.
    /// </summary>
    public class NewEquipmentParameters
    {
        public int IdTypeEquipement { get; set; }
        public string Marque { get; set; }
        public string Modele { get; set; }
        public string NumeroSerie { get; set; }
        public string? Commentaire { get; set; }
    }
}
