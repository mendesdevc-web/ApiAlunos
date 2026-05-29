using System.ComponentModel.DataAnnotations;

namespace AlunosApi.ViewModels
{
    public class LoginModel
    {
        [Required(ErrorMessage = "O campo Email é obrigatório.")]
        [EmailAddress(ErrorMessage = "O campo Email não é válido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório.")]
        [StringLength(20, ErrorMessage = "O campo Senha deve conter no máximo 20 caracteres.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
