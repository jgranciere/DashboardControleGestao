import React from 'react'
import BarraLateral from '../BarraLateral/BarraLateral'
import './Financeiro.css'
import DateTimeDisplay from '../../Hooks/DateTimeDisplay.jsx';

const Financeiro = () => {
  return (
    <>
      <BarraLateral />
      <div className='tela-principal-financeiro'>
        <div className='tela-principal-financeiro-cabecalho'>
          <h1>Financeiro</h1>
          <DateTimeDisplay/>
        </div>

        <div className='tela-principal-financeiro-informacoes'>
          <div className='financeiro-titulo'>
            <h2>Resumo Financeiro</h2>
          </div>

          <div className='financeiro-periodo'>
            <p>Periodo:</p>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>

          <div className='financeiro-informaçoes'>
            <div className='financeiro-valores'>
              <p>Receita Total</p>
              <h1>R$: 0,00</h1>
            </div>

            <div className='financeiro-valores despesa'>
              <p>Despesa Total</p>
              <h1>R$: 0,00</h1>
            </div>

            <div className='financeiro-valores lucro-bruto'>
              <p>Lucro Bruto</p>
              <h1>R$: 0,00</h1>
            </div>

            <div className='financeiro-valores lucro-liquido'>
              <p>Lucro Líquido</p>
              <h1>R$: 0,00</h1>
            </div>
          </div>

        </div>

        <div className='tela-principal-financeiro-informacoes'>
          <div className='financeiro-titulo'>
            <h2>Registrar Nova Despesa</h2>
          </div>

          <div className='inputs-despesas-financeiro'>
            <div className='financeiro-despesa'>
              <p>Data da Despesa:</p>
              <input type="date" />
            </div>

            <div className='financeiro-despesa'>
              <p>Descrição:</p>
              <input type="text" />
            </div>

            <div className='financeiro-despesa'>
              <p>Valor (R$):</p>
              <input type="number" />
            </div>
          </div>

          <div className='financeiro-categoria'>
            <div className='inputs-financeiro-categoria'>
              <p>Categoria:</p>
              <select name="" id="">
                <option value=""></option>
              </select>
            </div>
          </div>

          <div className='tela-estoque-botao'>
            <button className='btn-limpar-formulario'>Limpar Formulário</button>
            <button className='btn-registrar despesa-btn'>Registrar Despesa</button>
          </div>
        </div>

        <div className='tela-principal-financeiro-informacoes'>
          <div className='financeiro-titulo'>
            <h2>Histórico de Transações</h2>
          </div>

          <div className='inputs-despesas-financeiro financeiro-transacoes'>
            <div className='financeiro-despesa'>
              <p>Buscar (Descrição/ID):</p>
              <input type="text" />
            </div>

            <div className='financeiro-despesa'>
              <p>Tipo de Transação:</p>
              <select name="" id="">
                <option value=""></option>
              </select>
            </div>

            <div className='financeiro-despesa'>
              <p>Categoria (somente despesas):</p>
              <select name="" id="">
                <option value=""></option>
              </select>
            </div>
          </div>

          <div className='receitas-tabela'>
              <table className='tabela-pedidos'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Valor</th>
                  </tr>
                </thead>
              </table>
            </div>
        </div>
      </div>
    </>
  )
}

export default Financeiro