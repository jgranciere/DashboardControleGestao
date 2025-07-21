using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Model;

public class Ingrediente
{
    [Key] 
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Nome { get; set; }

    [Required]
    [StringLength(10)]
    public string UnidadeMedida { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal QuantidadeEstoque { get; set; } = 0.00m;

    [Column(TypeName = "decimal(10, 2)")]
    public decimal CustoMedio { get; set; } = 0.00m;

    [Column(TypeName = "decimal(10, 2)")]
    public decimal EstoqueMinimo { get; set; } = 0.00m;

    [StringLength(100)]
    public string? FornecedorPadrao { get; set; }

    public DateTime? DataValidadeProxima { get; set; }
    public DateTime DataUltimaAtualizacao { get; set; } = DateTime.UtcNow;
}
