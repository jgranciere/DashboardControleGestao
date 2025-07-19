using Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;




namespace WebApplication1.Controllers
 
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlertaController : ControllerBase
    {
        private readonly GestaoDbContext _context;
        public AlertaController(GestaoDbContext context)
        {
            _context = context;
        }
        
    
        [HttpGet("alertas")]
        public async Task<IActionResult> GetAlertas()
        {
            var produtos = await _context.Produtos.ToListAsync();

            var alertas = new List<object>();

            foreach (var produto in produtos)
            {
                // calcula estoque 
                var entradas = await _context.Lancamentos
                    .Where(l => l.ProdutoId == produto.Id && l.Tipo == "entrada")
                    .SumAsync(l => (double?)l.Quantidade) ?? 0;

                var saidas = await _context.Lancamentos
                    .Where(l => l.ProdutoId == produto.Id && l.Tipo == "saida")
                    .SumAsync(l => (double?)l.Quantidade) ?? 0;

                double estoqueAtual = entradas - saidas;

                bool alertaEstoque = estoqueAtual < produto.EstoqueMinimo;
                bool alertaValidade = produto.Validade.HasValue && produto.Validade.Value <= DateTime.UtcNow.AddDays(7);

                if (alertaEstoque || alertaValidade)
                {
                    alertas.Add(new
                    {
                        produto.Id,
                        produto.Nome,
                        EstoqueAtual = estoqueAtual,
                        EstoqueMinimo = produto.EstoqueMinimo,
                        produto.Validade,
                        AlertaEstoque = alertaEstoque,
                        AlertaValidade = alertaValidade
                    });
                }
            }

            return Ok(alertas);
        }

    }
}
   