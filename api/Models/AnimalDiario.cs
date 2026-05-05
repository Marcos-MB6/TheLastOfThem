namespace api.Models
{
    public class AnimalDiario
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public Animal Animal { get; set; }
    }
}