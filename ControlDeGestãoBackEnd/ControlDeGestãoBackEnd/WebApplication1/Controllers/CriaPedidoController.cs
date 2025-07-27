using Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.DTO;
using WebApplication1.Model;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidosController : ControllerBase
    {
        private readonly GestaoDbContext _context;

        public PedidosController(GestaoDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CriarPedido([FromBody] CriaPedidoDTO dto)
        {
            if (dto.Itens.Count == 0)
                return BadRequest("O pedido deve conter ao menos um item.");

            var pedido = new CriaPedido
            {
                ValorEntrega = dto.ValorEntrega,
                EnderecoEntrega = dto.EnderecoEntrega,
                TelefoneContato = dto.TelefoneContato,
                NomeCliente = dto.NomeCliente,
                CuponDesconto = dto.CuponDesconto,
                Observacoes = dto.Observacoes,
                Status = "Pendente"
            };

            double total = 0;

            foreach (var item in dto.Itens)
            {
                var produto = await _context.Produtos.FindAsync(item.ProdutoId);
                if (produto == null) return BadRequest($"Produto ID {item.ProdutoId} não encontrado.");

                var itemPedido = new ItemPedido
                {
                    ProdutoId = item.ProdutoId,
                    Quantidade = item.Quantidade,
                    PrecoUnitario = produto.Preco
                };

                total += itemPedido.PrecoUnitario * itemPedido.Quantidade;
                pedido.Itens.Add(itemPedido);
            }

            pedido.ValorTotal = total + pedido.ValorEntrega;

            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(ObterPedido), new { id = pedido.Id }, pedido);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPedido(int id)
        {
            var pedido = await _context.Pedidos
                .Include(p => p.Itens)
                .ThenInclude(i => i.Produto)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pedido == null)
                return NotFound();

            return Ok(pedido);
        }
    }
}