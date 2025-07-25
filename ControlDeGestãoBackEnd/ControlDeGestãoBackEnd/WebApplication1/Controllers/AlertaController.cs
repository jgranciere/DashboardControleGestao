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
            var ingredientes = await _context.Ingredientes.ToListAsync();

            var alertas = new List<object>();

            foreach (var ingrediente in ingredientes)
            {
                bool alertaEstoque = ingrediente.QuantidadeEstoque < ingrediente.EstoqueMinimo;

                bool alertaValidade = ingrediente.DataValidadeProxima.HasValue &&
                                      ingrediente.DataValidadeProxima.Value <= DateTime.UtcNow.AddDays(7);

                if (alertaEstoque || alertaValidade)
                {
                    alertas.Add(new
                    {
                        ingrediente.Id,
                        ingrediente.Nome,
                        ingrediente.QuantidadeEstoque,
                        ingrediente.EstoqueMinimo,
                        DataValidade = ingrediente.DataValidadeProxima,
                        AlertaEstoque = alertaEstoque,
                        AlertaValidade = alertaValidade
                    });
                }
            }

            return Ok(alertas);
        }
    }
}
