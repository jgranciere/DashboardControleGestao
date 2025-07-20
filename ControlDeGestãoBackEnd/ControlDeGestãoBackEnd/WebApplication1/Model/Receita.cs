namespace WebApplication1.Model
{
    public class Receita
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public CriaProduto? Produto { get; set; }
        public   List<ItemReceita> Itens { get; set; } = new ();
    }
}
