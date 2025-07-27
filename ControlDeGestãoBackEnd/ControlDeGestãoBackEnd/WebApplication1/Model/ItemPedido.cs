using System.Text.Json.Serialization;
using WebApplication1.Model;

public class ItemPedido
{
    public int Id { get; set; }

    public int PedidoId { get; set; }
    [JsonIgnore]
    public CriaPedido Pedido { get; set; } = null!;

    public int ProdutoId { get; set; }
    public CriaProduto Produto { get; set; } = null!;

    public int Quantidade { get; set; }
    public double PrecoUnitario { get; set; }
}
