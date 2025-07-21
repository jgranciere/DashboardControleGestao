using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;
using WebApplication1.DTO;
using System.Linq;
using System.Threading.Tasks;
using Database;

namespace WebApplication1.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class IngredienteController : ControllerBase
    {
        private readonly GestaoDbContext _context;

        public IngredienteController(GestaoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IngredienteResponseDTO>>> GetIngredientes()
        {
            var ingredientes = await _context.Ingredientes.ToListAsync();

            var responseDTOs = ingredientes.Select(i => new IngredienteResponseDTO
            {
                Id = i.Id,
                Nome = i.Nome,
                UnidadeMedida = i.UnidadeMedida,
                QuantidadeEstoque = i.QuantidadeEstoque,
                CustoMedio = i.CustoMedio,
                EstoqueMinimo = i.EstoqueMinimo,
                FornecedorPadrao = i.FornecedorPadrao,
                DataValidadeProxima = i.DataValidadeProxima,
                DataUltimaAtualizacao = i.DataUltimaAtualizacao
            }).ToList();

            return Ok(responseDTOs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IngredienteResponseDTO>> GetIngrediente(int id)
        {
            var ingrediente = await _context.Ingredientes.FindAsync(id);

            if (ingrediente == null)
            {
                return NotFound("Ingrediente não encontrado");
            }

            var responseDTO = new IngredienteResponseDTO
            {
                Id = ingrediente.Id,
                Nome = ingrediente.Nome,
                UnidadeMedida = ingrediente.UnidadeMedida,
                QuantidadeEstoque = ingrediente.QuantidadeEstoque,
                CustoMedio = ingrediente.CustoMedio,
                EstoqueMinimo = ingrediente.EstoqueMinimo,
                FornecedorPadrao = ingrediente.FornecedorPadrao,
                DataValidadeProxima = ingrediente.DataValidadeProxima,
                DataUltimaAtualizacao = ingrediente.DataUltimaAtualizacao
            };

            return Ok(responseDTO);
        }

        [HttpPost]
        public async Task<ActionResult<IngredienteResponseDTO>> PostIngrediente(IngredienteDTO ingredienteDTO)
        {
            var ingrediente = new Ingrediente
            {
                Nome = ingredienteDTO.Nome,
                UnidadeMedida = ingredienteDTO.UnidadeMedida,
                EstoqueMinimo = ingredienteDTO.EstoqueMinimo,
                FornecedorPadrao = ingredienteDTO.FornecedorPadrao,
                QuantidadeEstoque = 0,
                CustoMedio = 0,
                DataUltimaAtualizacao = DateTime.UtcNow
            };

            _context.Ingredientes.Add(ingrediente);
            await _context.SaveChangesAsync();

            var responseDTO = new IngredienteResponseDTO
            {
                Id = ingrediente.Id,
                Nome = ingrediente.Nome,
                UnidadeMedida = ingrediente.UnidadeMedida,
                QuantidadeEstoque = ingrediente.QuantidadeEstoque,
                CustoMedio = ingrediente.CustoMedio,
                EstoqueMinimo = ingrediente.EstoqueMinimo,
                FornecedorPadrao = ingrediente.FornecedorPadrao,
                DataValidadeProxima = ingrediente.DataValidadeProxima,
                DataUltimaAtualizacao = ingrediente.DataUltimaAtualizacao
            };

            return CreatedAtAction(nameof(GetIngrediente), new { id = ingrediente.Id }, responseDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutIngrediente(int id, IngredienteDTO ingredienteDTO)
        {
            var ingrediente = await _context.Ingredientes.FindAsync(id);

            if (ingrediente == null)
            {
                return NotFound("Ingrediente não encontrado");
            }

            ingrediente.Nome = ingredienteDTO.Nome;
            ingrediente.UnidadeMedida = ingredienteDTO.UnidadeMedida;
            ingrediente.EstoqueMinimo = ingredienteDTO.EstoqueMinimo;
            ingrediente.FornecedorPadrao = ingredienteDTO.FornecedorPadrao;
            ingrediente.DataUltimaAtualizacao = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngredienteExists(id))
                {
                    return NotFound("Ingrediente não encontrado durante a atualização.");
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpPost("entrada")]
        public async Task<ActionResult<IngredienteResponseDTO>> RegistrarEntradaEstoque(EntradaEstoqueRequestDTO entradaDTO)
        {
            var ingrediente = await _context.Ingredientes.FindAsync(entradaDTO.IdIngrediente);

            if (ingrediente == null)
            {
                return NotFound("Ingrediente não encontrado para registrar a entrada.");
            }

            if (entradaDTO.QuantidadeEntrada <= 0 || entradaDTO.CustoUnitario <= 0)
            {
                return BadRequest("Quantidade e Custo Unitário da entrada devem ser maiores que zero.");
            }

            decimal custoTotalAtual = ingrediente.QuantidadeEstoque * ingrediente.CustoMedio;
            decimal custoTotalEntrada = entradaDTO.QuantidadeEntrada * entradaDTO.CustoUnitario;
            decimal novaQuantidadeTotal = ingrediente.QuantidadeEstoque + entradaDTO.QuantidadeEntrada;

            if (novaQuantidadeTotal > 0)
            {
                ingrediente.CustoMedio = (custoTotalAtual + custoTotalEntrada) / novaQuantidadeTotal;
            }
            else
            {
                ingrediente.CustoMedio = 0; 
            }

            ingrediente.QuantidadeEstoque = novaQuantidadeTotal;
            ingrediente.DataUltimaAtualizacao = DateTime.UtcNow;

            if (entradaDTO.DataValidade.HasValue)
            {
                if (!ingrediente.DataValidadeProxima.HasValue || entradaDTO.DataValidade.Value < ingrediente.DataValidadeProxima.Value)
                {
                    ingrediente.DataValidadeProxima = entradaDTO.DataValidade.Value;
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngredienteExists(ingrediente.Id))
                {
                    return NotFound("Ingrediente não encontrado durante a atualização da entrada.");
                }
                else
                {
                    throw;
                }
            }

            var responseDTO = new IngredienteResponseDTO
            {
                Id = ingrediente.Id,
                Nome = ingrediente.Nome,
                UnidadeMedida = ingrediente.UnidadeMedida,
                QuantidadeEstoque = ingrediente.QuantidadeEstoque,
                CustoMedio = ingrediente.CustoMedio,
                EstoqueMinimo = ingrediente.EstoqueMinimo,
                FornecedorPadrao = ingrediente.FornecedorPadrao,
                DataValidadeProxima = ingrediente.DataValidadeProxima,
                DataUltimaAtualizacao = ingrediente.DataUltimaAtualizacao
            };

            return Ok(responseDTO);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIngrediente(int id)
        {
            var ingrediente = await _context.Ingredientes.FindAsync(id);
            if (ingrediente == null)
            {
                return NotFound("Ingrediente não encontrado para exclusão.");
            }

            _context.Ingredientes.Remove(ingrediente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IngredienteExists(int id)
        {
            return _context.Ingredientes.Any(e => e.Id == id);
        }
    }
}
