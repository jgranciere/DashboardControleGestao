using WebApplication1.DTO;

public interface IReceitaService
{
    Task<ReceitaDetalhadaDTO> CriarReceitaAsync(ReceitaDTO dto);
    Task<ReceitaDetalhadaDTO> AtualizarReceitaAsync(ReceitaDTO dto);
    Task<ReceitaDetalhadaDTO?> ObterReceitaPorIdAsync(int id);
}
