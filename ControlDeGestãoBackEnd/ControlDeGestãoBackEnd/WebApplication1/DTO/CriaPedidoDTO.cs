namespace WebApplication1.DTO
{
    public class CriaPedidoDTO
    {
       
        public List<ItemPedidoDTO> Itens { get; set; } = new();
        public double ValorEntrega { get; set; }
        public string? EnderecoEntrega { get; set; }
        public string? TelefoneContato { get; set; }
        public string? NomeCliente { get; set; }
        public string? CuponDesconto { get; set; }
        public string? Observacoes { get; set; }
        

    }
}
