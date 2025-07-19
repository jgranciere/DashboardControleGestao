namespace WebApplication1.Model
{
    public class ItemReceita
    {
        public int Id { get; set; }
        public int receitaId { get; set; }
        public Receita Receita { get; set; }
        public int IngredienteId { get; set; }
        public Produto Ingrediente { get; set; }
        public double Quantidade { get; set; }
    }
}
