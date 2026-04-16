using System.Security.Cryptography;
using System.Text;
using api.DTOs;
using api.Models;
using API.Controllers;
using API.Data;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class UserController : BaseApiController
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UserController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(RegisterDTO registerdto)
        {

            if (await _context.Usuarios.AnyAsync(u => u.Username == registerdto.Username.ToLower()))
            {
                return BadRequest("Este nombre de usuario ya está en uso.");
            }
            using var hmac = new HMACSHA512();



            User usuario = new User
            {
                Username = registerdto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerdto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Usuario registrado",
                username = usuario.Username
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(LoginDTO logindto)
        {
            User usuario = _context.Usuarios.SingleOrDefault(u => u.Username == logindto.Username);

            if (usuario == null) return Unauthorized("Nome incorrecto");

            using var hmac = new HMACSHA512(usuario.PasswordSalt);

            var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(logindto.Password));

            for (int i = 0; i < ComputeHash.Length; i++)
            {
                if (ComputeHash[i] != usuario.PasswordHash[i]) return Unauthorized("Contraseña incorrecta");
            }

            return usuario;
        }

    }
}