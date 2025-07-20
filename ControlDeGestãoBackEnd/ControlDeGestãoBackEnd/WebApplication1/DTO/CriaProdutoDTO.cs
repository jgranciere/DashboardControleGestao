using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using WebApplication1.Model;

public class ProdutoDTO
{
    [Required]
    public string Nome { get; set; }

    public string Descricao { get; set; }

    public string Imagem { get; set; }

    [Required]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public UnidadeMedida UnidadeMedida { get; set; }

    [Required]
    public double Preco { get; set; }

    public int IdCategoria { get; set; }

    [Required]
    public double EstoqueMinimo { get; set; }

    [Required]
    public DateTime? Validade { get; set; }
}
