using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApplication1.Model
{
    public enum UnidadeMedida
    {
        Unidade,
        Kg,
        Grama,
        Litro,
        Mililitro
    }
    public class CriaProduto
    {
       

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório")]
        public string Nome { get; set; }

        public string Descricao { get; set; }

        public double Preco { get; set; }

        public UnidadeMedida UnidadeMedida { get; set; }

        public string Imagem { get; set; }


        [Required(ErrorMessage = "Informe uma Categoria para o Produto")]
        public Categoria Categoria { get; set; }


        [Required(ErrorMessage = "Informe EstoqueMinimo para o Produto")]
        public double EstoqueMinimo { get; set; } = 1;
        [Required(ErrorMessage = "Informe uma Validade para o Produto")]
        public DateTime? Validade { get; set; }

    }
}
