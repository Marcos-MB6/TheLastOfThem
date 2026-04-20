namespace api.DTOs
{
    public class FiltroBusquedaDTO
    {
        public string? NombreBusqueda { get; set; }
        public List<string>? Reinos { get; set; }
        public List<string>? Redlist { get; set; }
        public List<string>? Continentes { get; set; }
    }
}