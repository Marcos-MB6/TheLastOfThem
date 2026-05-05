using System.Security.Cryptography;
using System.Text;
using api.DTOs;
using api.Interfaces;
using api.Models;
using api.Services;
using API.Controllers;
using API.Data;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class UserController : BaseApiController
    {
        public readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public UserController(AppDbContext context, IMapper mapper, ITokenService tokenService)
        {
            _context = context;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerdto)
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
                PasswordSalt = hmac.Key,
                Tipo = "NoAdmin"
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return new UserDTO
            {
                Username = usuario.Username,
                Token = _tokenService.CreateToken(usuario)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO logindto)
        {
            User usuario = _context.Usuarios.SingleOrDefault(u => u.Username == logindto.Username);

            if (usuario == null) return Unauthorized("Nome incorrecto");

            using var hmac = new HMACSHA512(usuario.PasswordSalt);

            var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(logindto.Password));

            for (int i = 0; i < ComputeHash.Length; i++)
            {
                if (ComputeHash[i] != usuario.PasswordHash[i]) return Unauthorized("Contraseña incorrecta");
            }

            return new UserDTO
            {
                Username = usuario.Username,
                Token = _tokenService.CreateToken(usuario)
            };
        }

    }
}