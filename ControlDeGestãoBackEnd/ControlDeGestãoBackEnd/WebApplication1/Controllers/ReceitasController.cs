using Database;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Model;
using Microsoft.EntityFrameworkCore;
using WebApplication1.DTO;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReceitasController : ControllerBase
    {
        private readonly GestaoDbContext _context;
        public  ReceitasController(GestaoDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CriarReceita([FromBody] ReceitaDTO dto)
        {
            var produto = await _context.Produtos.FindAsync(dto.ProdutoId);
            if (produto == null)
                return NotFound("Produto Não encontrado");

            var receita = new Receita
            {
                ProdutoId = dto.ProdutoId,
            };

            foreach (var item in dto.Itens)
            {
                var ingrediente = await _context.Produtos.FindAsync(item.IngredienteId);
                if (ingrediente == null)
                    return BadRequest($"Ingrediente com ID {item.IngredienteId} não encontrado");

                receita.Itens.Add(new ItemReceita
                {
                    IngredienteId = item.IngredienteId,
                    Quantidade = item.Quantidade
                });
            }

            _context.Receitas.Add(receita);
            await _context.SaveChangesAsync();

            return Ok(receita);
        }


        [HttpGet("{produtoId}")]
        public async Task<IActionResult> GetReceitaPorProduto(int produtoId)
        {
            var receita = await _context.Receitas
                .Include(r => r.Itens)
                .ThenInclude(i => i.Ingrediente)
                .FirstOrDefaultAsync(r => r.ProdutoId == produtoId);

            if (receita == null)
                return NotFound("Receita não encontrada");

            return Ok(new
            {
                Produto = receita.ProdutoId,
                Ingredientes = receita.Itens.Select(i => new
                {
                    i.IngredienteId,
                    nome = i.Ingrediente.Nome,
                    Quantidade = i.Quantidade,
                    unidade = i.Ingrediente.UnidadeMedida.ToString()
                })
            });
        }

        [HttpGet("custo/{produtoId}")]
        public async Task<IActionResult> GetCustoDeProducao(int produtoId)
        {
            var receita = await _context.Receitas
                .Include(r => r.Itens)
                .ThenInclude(i => i.Ingrediente)
                .FirstOrDefaultAsync(r => r.ProdutoId == produtoId);

            if (receita == null)
                return NotFound("Receita não encontrada");

            double custoTotal = 0;

            foreach (var item in receita.Itens)
            {
                custoTotal += item.Ingrediente.Preco * item.Quantidade;
            }

            return Ok(new
            {
                ProdutoId = produtoId,
                CustoDeProducao = custoTotal
            });
        }
    }
}
