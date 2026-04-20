using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Please enter a username")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Please enter a password")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please enter a Confirm Password")]
        [Compare("Password", ErrorMessage = "Please ensure both passwords match")]
        public string ConfirmPassword { get; set; }
    }
}