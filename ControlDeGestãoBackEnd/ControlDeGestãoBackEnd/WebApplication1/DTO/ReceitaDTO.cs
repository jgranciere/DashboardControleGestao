namespace WebApplication1.DTO
{
    public class ReceitaDTO
    {
        public int Id { get; set; }  
        public int ProdutoId { get; set; }
        public List<ItemReceitaDTO> Itens { get; set; } = new List<ItemReceitaDTO>();
    }
}
