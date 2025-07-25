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
        private readonly IReceitaService _receitaService;

        public ReceitasController(IReceitaService receitaService)
        {
            _receitaService = receitaService;
        }

        [HttpPost]
        public async Task<IActionResult> CriarReceita([FromBody] ReceitaDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var resultado = await _receitaService.CriarReceitaAsync(dto);
                return Created(string.Empty, resultado);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterReceita(int id)
        {
            var receita = await _receitaService.ObterReceitaPorIdAsync(id);
            if (receita == null)
                return NotFound("Receita não encontrada.");
            return NotFound(new { erro = "Receita não encontrada." });

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarReceita(int id, [FromBody] ReceitaDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                dto.Id = id; // garante consistência
                var resultado = await _receitaService.AtualizarReceitaAsync(dto);
                return Ok(resultado);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { erro = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }


    }

}
