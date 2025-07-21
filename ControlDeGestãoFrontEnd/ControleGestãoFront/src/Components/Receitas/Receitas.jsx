import React from 'react'
import BarraLateral from '../BarraLateral/BarraLateral'
import './Receitas.css'
import DateTimeDisplay from '../../Hooks/DateTimeDisplay.jsx';

const Receitas = () => {
  return (
    <>
      <BarraLateral />
      <div className='tela-principal-receitas'>
        <div className='tela-principal-receitas-cabecalho'>
          <h1>Receitas</h1>
          <DateTimeDisplay/>
        </div>

        <div className='tela-receitas-informacoes'>
          <div className='tela-receitas-titulo'>
            <h2>Criar/Editar Receita</h2>
          </div>

          <div className='tela-selecionar-receita'>
            <p>Produto (Batata Recheada):</p>
            <select name="" id="">
              <option value="batata-recheada">Batata Recheada</option>
              <option value="hamburguer">Batata Recheada</option>
              <option value="pizza">Batata Recheada</option>
            </select>
          </div>

          <div className='receita-titulo-ingredientes'>
              <h3>Ingredientes da Receita:</h3>
          </div>

          <div className='selecionar-ingredientes'>
            <div className='receitas-inputs'>
              <p>Ingrediente:</p>
              <select name="" id="">
                <option value=""></option>
              </select>
            </div>

            <div className='receitas-input-qtd'>
              <p>Quantidade necessaria:</p>
              <input type="number" />
            </div>

            <div className='receitas-btn'>
              <button>Adicionar Ingrediente</button>
            </div>
          </div>
          
          <div className='receitas-tabela'>
          <table className='tabela-pedidos'>
              <thead>
                <tr>
                  <th>Ingrediente</th>
                  <th>Qtd. Necessária</th>
                  <th>Unidade</th>
                  <th>Custo Estimado</th>
                  <th>Ações</th>
                </tr>
              </thead>
            </table>
          </div>

          <div className='receitas-valor-total'>
            <h2>Custo Total da Receita:</h2>
          </div>

          <div className='tela-estoque-botao'>
            <button className='btn-limpar-formulario'>Limpar Formulário</button>
            <button className='btn-registrar'>Salvar Receita</button>
          </div>

        </div>

        <div className='tela-receitas-informacoes'>
          <div className='tela-receitas-titulo'>
            <h2>Receitas Existentes</h2>
          </div>

          <div className='tela-selecionar-receita'>
            <p>Buscar Receita (por nome ou ingrediente):</p>
            <input type='text' placeholder='Buscar por nome da batata ou ingrediente'></input>
          </div>

          <div className='receitas-tabela'>
          <table className='tabela-pedidos'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Batata Recheada</th>
                  <th>Custo Produção</th>
                  <th>Preço Venda</th>
                  <th>Margem Lucro</th>
                  <th>Ações</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>


      </div>
    </>
  )
}

export default Receitas