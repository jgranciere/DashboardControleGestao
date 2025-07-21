using System.ComponentModel.DataAnnotations;

namespace WebApplication1.DTO
{
    public class EntradaEstoqueRequestDTO
    {
        [Required(ErrorMessage = "O ID do ingrediente é obrigatório para registrar uma entrada.")]
        public int IdIngrediente { get; set; }

        [Required(ErrorMessage = "A quantidade de entrada é obrigatória.")]
        [Range(0.01, 999999.99, ErrorMessage = "A quantidade de entrada deve ser maior que zero.")]
        public decimal QuantidadeEntrada { get; set; }

        [Required(ErrorMessage = "O custo unitário da entrada é obrigatório.")]
        [Range(0.01, 999999.99, ErrorMessage = "O custo unitário deve ser maior que zero.")]
        public decimal CustoUnitario { get; set; }

        [Required(ErrorMessage = "A data de entrada é obrigatória.")]
        public DateTime DataEntrada { get; set; }

        public DateTime? DataValidade { get; set; } 
    }
}
