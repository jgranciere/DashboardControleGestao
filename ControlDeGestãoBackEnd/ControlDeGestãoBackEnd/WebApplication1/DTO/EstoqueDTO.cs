using System.ComponentModel.DataAnnotations;
using WebApplication1.Model;
using System.Text.Json.Serialization;
using WebApplication1.Enums;


namespace WebApplication1.DTO
{
    public class EstoqueDTO
    {
        [Required]
        public int ProdutoId { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "A quantidade deve ser maior que zero.")]
        public double Quantidade { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UnidadeMedida UnidadeMedida { get; set; }
    }
}
    
