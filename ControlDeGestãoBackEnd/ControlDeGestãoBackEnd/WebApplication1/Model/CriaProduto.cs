using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using WebApplication1.Enums;

namespace WebApplication1.Model
{
    public class CriaProduto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public string? Imagem { get; set; }
        public double Preco { get; set; }

        
        public UnidadeMedida UnidadeMedida { get; set; }    
        public int EstoqueMinimo { get; set; }               
                   

        public Categoria Categoria { get; set; } = null!;
    }
}
