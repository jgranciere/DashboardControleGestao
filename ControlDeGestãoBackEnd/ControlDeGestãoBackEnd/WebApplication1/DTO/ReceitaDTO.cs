using System.ComponentModel.DataAnnotations;

public class ReceitaDTO
{
    public int Id { get; set; }

    [Required]
    public string Nome { get; set; }

    [Required]
    public int ProdutoId { get; set; }

    [MinLength(1, ErrorMessage = "A receita precisa de pelo menos 1 ingrediente.")]
    public List<ReceitaItemDTO> Itens { get; set; } = new();
}

public class ReceitaItemDTO
{
    public int IngredienteId { get; set; }

    [Range(0.1, double.MaxValue, ErrorMessage = "Quantidade deve ser maior que 0.")]
    public double Quantidade { get; set; }
}
