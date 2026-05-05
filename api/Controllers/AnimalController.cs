using api.DTOs;
using api.Models;
using API.Controllers;
using API.Data;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class AnimalController : BaseApiController
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public AnimalController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<AnimalDTO>>> GetAnimales()
        {
            List<Animal> animales = _context.Animales.ToList();
            List<AnimalDTO> animalesDTO = _mapper.Map<List<AnimalDTO>>(animales);

            return Ok(animalesDTO);

        }

        [HttpGet("nombresComunes")]
        public async Task<ActionResult<List<string>>> GetComunesAnimales()
        {
            List<string> nombresComunes = _context.Animales.Select(a => a.NombreComun).ToList();

            return Ok(nombresComunes);

        }

        [HttpGet("nombresCientificos")]
        public async Task<ActionResult<List<string>>> GetCientificosAnimales()
        {
            List<string> nombresCientificos = _context.Animales.Select(a => a.NombreCientifico).ToList();

            return Ok(nombresCientificos);

        }

        [HttpGet("minigame")]
        public async Task<ActionResult<AnimalDTO>> MinijuegoDiario()
        {
            DateTime fechaHoy = DateTime.Today;

            AnimalDiario registroDiario = _context.AnimalDiario.Include(ad => ad.Animal).FirstOrDefault(ad => ad.Fecha == fechaHoy);

            if (registroDiario != null)
            {
                AnimalDTO animaldto = _mapper.Map<AnimalDTO>(registroDiario.Animal);
                return (animaldto);
            }
            else
            {
                Random rand = new Random();

                int numeroMaximo = _context.Animales.Select(a => a.Id).Max();
                int numeroRandom = rand.Next(1, numeroMaximo);
                Animal animalSeleccionado = _context.Animales.First(a => a.Id == numeroRandom);

                AnimalDiario nuevoRegistroDiario = new AnimalDiario
                {
                    Fecha = DateTime.Today,
                    Animal = animalSeleccionado
                };

                _context.AnimalDiario.Add(nuevoRegistroDiario);
                await _context.SaveChangesAsync();

                AnimalDTO animaldto = _mapper.Map<AnimalDTO>(nuevoRegistroDiario.Animal);
                return (animaldto);
            }
        }


        [HttpGet("animal/{id}")]
        public async Task<ActionResult<AnimalDTO>> GetAnimalId(int id)
        {
            Animal animal = _context.Animales.First(a => a.Id == id);
            AnimalDTO animaldto = _mapper.Map<AnimalDTO>(animal);
            return Ok(animaldto);

        }

        [HttpGet("filtros")]
        public async Task<ActionResult<List<AnimalDTO>>> GetAnimalesFiltros([FromQuery] FiltroBusquedaDTO filtroBusquedaDTO)
        {
            var consulta = _context.Animales.AsQueryable();

            if (filtroBusquedaDTO.NombreBusqueda != "" && filtroBusquedaDTO.NombreBusqueda != null)
            {
                consulta = consulta.Where(a => a.NombreComun.ToLower().Contains(filtroBusquedaDTO.NombreBusqueda.ToLower()) ||
                a.NombreCientifico.ToLower().Contains(filtroBusquedaDTO.NombreBusqueda.ToLower()));
            }

            if (filtroBusquedaDTO.Reinos.Any())
            {
                consulta = consulta.Where(a => filtroBusquedaDTO.Reinos.Contains(a.Reino));
            }

            if (filtroBusquedaDTO.Redlist.Any())
            {
                consulta = consulta.Where(a => filtroBusquedaDTO.Redlist.Contains(a.Categoria));
            }

            if (filtroBusquedaDTO.Continentes.Any())
            {
                consulta = consulta.Where(a => filtroBusquedaDTO.Continentes.Contains(a.Continente));
            }

            List<Animal> animalesFiltrados = await consulta.ToListAsync();
            List<AnimalDTO> animalesFiltradosDTO = _mapper.Map<List<AnimalDTO>>(animalesFiltrados);

            return Ok(animalesFiltradosDTO);
        }

    }
}