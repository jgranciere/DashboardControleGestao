using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using WebApplication1.Model;

public class CriaProdutoDTO
{
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } 
    public double Preco { get; set; }
    public int IdCategoria { get; set; }
    public string? Imagem { get; set; }
}
