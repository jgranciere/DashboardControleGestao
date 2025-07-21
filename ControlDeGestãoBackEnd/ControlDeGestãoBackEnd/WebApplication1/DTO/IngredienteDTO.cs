using System.ComponentModel.DataAnnotations;

namespace WebApplication1.DTO
{
    public class IngredienteDTO
    {

        [Required(ErrorMessage = "O nome do ingrediente é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome do ingrediente deve ter no máximo 100 caracteres.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "A unidade de medida é obrigatória.")]
        [StringLength(10, ErrorMessage = "A unidade de medida deve ter no máximo 10 caracteres.")]
        public string UnidadeMedida { get; set; }

        [Range(0, 999999.99, ErrorMessage = "O estoque mínimo deve ser um valor positivo.")]
        public Decimal EstoqueMinimo { get; set; }

        [StringLength(100, ErrorMessage = "O nome do fornecedor deve ter no máximo 100 caracteres.")]
        public string? FornecedorPadrao { get; set; }
    }
}
