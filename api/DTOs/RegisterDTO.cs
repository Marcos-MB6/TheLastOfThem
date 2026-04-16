using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class RegisterDTO
    {
        [Required] public string Username { get; set; }
        [Required] public string Password { get; set; }
        
        [Required][Compare("Password", ErrorMessage = "Las contraseñas no coinciden")]
        public string ConfirmPassword { get; set; }
    }
}