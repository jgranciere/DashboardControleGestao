import React from 'react'
import BarraLateral from '../BarraLateral/BarraLateral'
import './VendasEPedidos.css'


const VendasEPedidos = () => {
  return (
    <>
      <BarraLateral />
      <div className='tela-principal-vendas'>
        <div className='tela-principal-vendas-cabecalho'>
          <h1>Vendas e Pedidos</h1>
        </div>

        <div className='tela-principal-vendas-informacoes'>
          <div className='tela-principal-registrar-pedido'>
            <h2>Registrar Novo Pedido</h2>
          </div>

          <div className='tela-principal-input-pedido'>
            <div className='tela-principal-options-produto'>
              <p>Produto:</p>
              <select name="" id="">
                <option value="produto1">Produto 1</option>
                <option value="produto2">Produto 2</option>
                <option value="produto3">Produto 3</option>
              </select>
            </div>

            <div className='tela-principal-quantidade-produto'>
              <p>Quantidade:</p>
              <input type="number" placeholder='Quantidade' />
            </div>
          </div>

          <div className='tela-principal-pedido-button'>
            <button>Adicionar Pedido</button>
          </div>

          <div className='tela-principal-vendas-tabela'>
            <table className='tabela-pedidos'>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço Unit.</th>
                  <th>Qtd.</th>
                  <th>Subtotal</th>
                  <th>Ações</th>
                </tr>
              </thead>
            </table>
          </div>

          <div className='tela-principal-vendas-valor-total'>
            <div className='vendas-inputs-valor-total'>
              <div className='inputs-valor-total'>
                <p>Taxa de Entrega:</p>
                <input type="number" placeholder='' />
              </div>

              <div className='inputs-valor-total'>
                <p>Desconto:</p>
                <input type="number" placeholder='' />
              </div>
            </div>
            
            <div className='total-pedido'>
              <h2>Total do Pedido:</h2>
            </div>
          </div>

          <div className='tela-principal-vendas-opcoes-pagamento'>
            <div className='tela-principal-options-produto'>
              <p>Forma de Pagamento:</p>
              <select name="" id="">
                <option value="produto1">Produto 1</option>
                <option value="produto2">Produto 2</option>
                <option value="produto3">Produto 3</option>
              </select>
            </div>  

            <div className='tela-principal-options-produto'>
              <p>Status do Pedido:</p>
              <select name="" id="">
                <option value="produto1">Produto 1</option>
                <option value="produto2">Produto 2</option>
                <option value="produto3">Produto 3</option>
              </select>
            </div>
          </div>

          <div className='tela-principal-vendas-observacoes'>
            <p>Observações:</p>
            <textarea name="" id="" className='vendas-textarea'></textarea>
          </div>

          <div className='botoes-limpar-registrar'>
            <button className='botoes-limpar'>Limpar Formulário </button>
            <button className='botoes-registrar'>Registrar Pedido</button>
          </div>

        </div>

        <div className='tela-principal-vendas-informacoes'>
          <div className='tela-principal-registrar-pedido'>
              <h2>Pedidos Existentes</h2>
          </div>

          <div className='tela-secundaria-inputs'>
              <div className='inputs-pedidos-secundaria'>
                <p>Buscar (ID/ITEM)</p>
                <input type="text" />
              </div>

              <div className='inputs-pedidos-secundaria'>
                <p>Filtrar por status</p>
                <select name="" id="">
                  <option value="todos">Todos</option>
                  <option value="pendente">Pendente</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>

              <div className='inputs-pedidos-secundaria-data'>
                <p>Data Inicio</p>
                <input type="date" />
              </div>

              <div className='inputs-pedidos-secundaria-data'>
                <p>Data Fim</p>
                <input type="date" />
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VendasEPedidos