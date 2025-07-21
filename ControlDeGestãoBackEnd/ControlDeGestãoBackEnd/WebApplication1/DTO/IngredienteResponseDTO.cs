namespace WebApplication1.DTO
{
    public class IngredienteResponseDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string UnidadeMedida { get; set; }
        public decimal QuantidadeEstoque { get; set; }
        public decimal CustoMedio { get; set; }
        public decimal EstoqueMinimo { get; set; }
        public string? FornecedorPadrao { get; set; }
        public DateTime? DataValidadeProxima { get; set; }
        public DateTime DataUltimaAtualizacao { get; set; }
    }
}
