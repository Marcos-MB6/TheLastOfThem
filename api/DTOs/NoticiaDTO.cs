namespace API.Dtos;

public class ListaNoticiasDTO
{
    public List<NoticiaDTO> articles { get; set; }
}
public class NoticiaDTO
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Url { get; set; }
    public string Image { get; set; }

}