using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Models;
using API.Controllers;
using API.Data;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

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
            List<AnimalDTO> animalesFiltradosDTO = _mapper.Map<List<AnimalDTO>>(animales);

            return Ok(animales);

        }

        [HttpGet("filtros")]
        public async Task<ActionResult<List<AnimalDTO>>> GetAnimalesFiltros([FromQuery] FiltroBusquedaDTO filtroBusquedaDTO)
        {
            var consulta = _context.Animales.AsQueryable();

            if (filtroBusquedaDTO.NombreBusqueda != "")
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