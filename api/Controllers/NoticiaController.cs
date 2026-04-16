using API.Controllers;
using API.Data;
using API.Dtos;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class NoticiaController : BaseApiController
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly IHttpClientFactory _httpClientFactory;

        public NoticiaController(AppDbContext context, IMapper mapper, IConfiguration config, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoticiaDTO>>> ObtenerNoticias()
        {
            var apiKey = "c4c690d9ee42d55d7d29f9bcb75d2654";
            var url = $"https://gnews.io/api/v4/search?q=\"animal extinction\" OR \"endangered species\"&lang=en&max=5&apikey={apiKey}";

            var client = _httpClientFactory.CreateClient();
            var response = await client.GetFromJsonAsync<ListaNoticiasDTO>(url);

            return Ok(response?.articles);
        }
    }
}