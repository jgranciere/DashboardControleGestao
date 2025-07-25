using WebApplication1.DTO;




namespace WebApplication1.DTO
{
    public class ReceitaDetalhadaDTO
    {
        public string Nome { get; set; } = string.Empty;
        public int ProdutoId { get; set; }
        public double CustoTotal { get; set; }
        public List<ItemDetalhadoDTO> Itens { get; set; } = new();
    }

    public class ItemDetalhadoDTO
    {
        public int IngredienteId { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Unidade { get; set; } = string.Empty;
        public double Quantidade { get; set; }
        public double PrecoUnitario { get; set; }
        public double Subtotal { get; set; }
    }
}
