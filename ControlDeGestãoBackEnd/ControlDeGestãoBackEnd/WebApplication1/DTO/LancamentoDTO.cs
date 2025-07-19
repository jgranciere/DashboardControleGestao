using System.ComponentModel.DataAnnotations;
using WebApplication1.Model;

namespace WebApplication1.DTO
{
    public class LancamentoDTO
    {
        [Required]
        public int ProdutoId { get; set; }

        [Required]
        public double Quantidade { get; set; }

        [Required]
        [RegularExpression("entrada|saida", ErrorMessage = "Tipo deve ser 'entrada' ou 'saida'.")]
        public string Tipo { get; set; }

        [Required]
        public UnidadeMedida UnidadeMedida { get; set; }
    }
}
