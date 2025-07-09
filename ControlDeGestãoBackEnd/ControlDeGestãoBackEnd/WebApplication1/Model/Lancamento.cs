using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Model
{
    public class Lancamento
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        [ForeignKey("ProdutoId")]
        public Produto? Produto { get; set; }
        public double Quantidade { get; set; }
        public string Tipo { get; set; }

        public UnidadeMedida UnidadeMedida { get; set; }
        public DateTime Data { get; set; }
    }
}
