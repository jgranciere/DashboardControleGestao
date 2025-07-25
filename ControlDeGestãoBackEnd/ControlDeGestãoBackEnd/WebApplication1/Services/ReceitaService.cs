using Database;
using WebApplication1.Model;
using WebApplication1.DTO;
using Microsoft.EntityFrameworkCore;

public class ReceitaService : IReceitaService
{
    private readonly GestaoDbContext _context;

    public ReceitaService(GestaoDbContext context)
    {
        _context = context;
    }

    public async Task<ReceitaDetalhadaDTO> CriarReceitaAsync(ReceitaDTO dto)
    {
        var produto = await _context.Produtos.FindAsync(dto.ProdutoId);
        if (produto == null)
            throw new ArgumentException("Produto não encontrado.");

        var receita = new Receita
        {
            Nome = dto.Nome,
            ProdutoId = dto.ProdutoId,
            Itens = new List<ItemReceita>()
        };

        double custoTotal = 0;

        foreach (var item in dto.Itens)
        {
            var ingrediente = await _context.Produtos.FindAsync(item.IngredienteId);
            if (ingrediente == null)
                throw new ArgumentException($"Ingrediente {item.IngredienteId} não encontrado.");

            receita.Itens.Add(new ItemReceita
            {
                IngredienteId = item.IngredienteId,
                Quantidade = item.Quantidade
            });

            custoTotal += ingrediente.Preco * item.Quantidade;
        }

        _context.Receitas.Add(receita);
        await _context.SaveChangesAsync();

        return await ObterReceitaPorIdAsync(receita.Id)
            ?? throw new Exception("Erro ao carregar a receita criada.");
    }

    public async Task<ReceitaDetalhadaDTO> AtualizarReceitaAsync(ReceitaDTO dto)
    {
        var receita = await _context.Receitas
            .Include(r => r.Itens)
            .FirstOrDefaultAsync(r => r.Id == dto.Id);

        if (receita == null)
            throw new KeyNotFoundException("Receita não encontrada.");

        receita.Nome = dto.Nome;
        receita.ProdutoId = dto.ProdutoId;

        _context.ItemReceitas.RemoveRange(receita.Itens);

        receita.Itens = new List<ItemReceita>();
        foreach (var item in dto.Itens)
        {
            var ingrediente = await _context.Produtos.FindAsync(item.IngredienteId);
            if (ingrediente == null)
                throw new ArgumentException($"Ingrediente {item.IngredienteId} não encontrado.");

            receita.Itens.Add(new ItemReceita
            {
                IngredienteId = item.IngredienteId,
                Quantidade = item.Quantidade
            });
        }

        await _context.SaveChangesAsync();

        return await ObterReceitaPorIdAsync(dto.Id)
               ?? throw new Exception("Erro ao carregar a receita atualizada.");
    }

    public async Task<ReceitaDetalhadaDTO?> ObterReceitaPorIdAsync(int id)
    {
        var receita = await _context.Receitas
            .Include(r => r.Itens)
            .ThenInclude(i => i.Ingrediente)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (receita == null) return null;

        double custoTotal = receita.Itens.Sum(i => i.Ingrediente.Preco * i.Quantidade);

        return new ReceitaDetalhadaDTO
        {
            Nome = receita.Nome,
            ProdutoId = receita.ProdutoId,
            CustoTotal = custoTotal,
            Itens = receita.Itens.Select(i => new ItemDetalhadoDTO
            {
                IngredienteId = i.IngredienteId,
                Nome = i.Ingrediente.Nome,
                Unidade = i.Ingrediente.UnidadeMedida.ToString(),
                Quantidade = i.Quantidade,
                PrecoUnitario = i.Ingrediente.Preco,
                Subtotal = i.Quantidade * i.Ingrediente.Preco
            }).ToList()
        };
    }
}
