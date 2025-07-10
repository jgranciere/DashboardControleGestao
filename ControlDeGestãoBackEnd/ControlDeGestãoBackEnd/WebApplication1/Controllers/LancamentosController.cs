namespace WebApplication1.Controllers
{
    using Database;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using WebApplication1.Model;

    namespace Vitrine.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class LancamentosController : ControllerBase
        {
            private readonly GestaoDbContext _context;

            public LancamentosController(GestaoDbContext context)
            {
                _context = context;
            }

            [HttpGet("produto/{produtoId}")]
            public async Task<IActionResult> GetByProduto(int produtoId)
            {
                var lancamentos = await _context.Lancamentos
                    .Where(l => l.ProdutoId == produtoId)
                    .OrderBy(l => l.Data)
                    .ToListAsync();

                if (!lancamentos.Any())
                    return NotFound("Nenhum lançamento encontrado para este produto.");

                return Ok(lancamentos);
            }

            [HttpPost]
            public async Task<IActionResult> Create(Lancamento lancamento)
            {
                var produto = await _context.Produtos.FindAsync(lancamento.ProdutoId);
                if (produto == null)
                    return NotFound("Produto não encontrado.");

                if (lancamento.Tipo != "entrada" && lancamento.Tipo != "saida")
                    return BadRequest("Tipo inválido. Use 'entrada' ou 'saida'.");

                if (lancamento.Quantidade <= 0)
                    return BadRequest("Quantidade deve ser maior que zero.");

                var entradas = await _context.Lancamentos
                    .Where(l => l.ProdutoId == lancamento.ProdutoId && l.Tipo == "entrada")
                    .SumAsync(l => (int?)l.Quantidade) ?? 0;

                var saidas = await _context.Lancamentos
                    .Where(l => l.ProdutoId == lancamento.ProdutoId && l.Tipo == "saida")
                    .SumAsync(l => (int?)l.Quantidade) ?? 0;

                int estoqueAtual = entradas - saidas;

                if (lancamento.Tipo == "saida" && estoqueAtual - lancamento.Quantidade < 0)
                    return BadRequest("Estoque insuficiente para essa saída.");

                lancamento.Data = DateTime.UtcNow.AddTicks(1);

                _context.Lancamentos.Add(lancamento);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetByProduto), new { produtoId = lancamento.ProdutoId }, lancamento);
            }
        }
    }
}
