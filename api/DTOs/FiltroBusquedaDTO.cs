namespace api.DTOs
{
    public class FiltroBusquedaDTO
    {
        public string? NombreBusqueda { get; set; }
        public List<string> Reinos { get; set; } = new List<string>();
        public List<string> Redlist { get; set; } = new List<string>();
        public List<string> Continentes { get; set; } = new List<string>();
    }
}