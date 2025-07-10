import React from 'react'
import BarraLateral from '../BarraLateral/BarraLateral'
import './Estoque.css'

const Estoque = () => {
  return (
    <>
      <BarraLateral />
      <div className='tela-principal-estoque'>
        <div className='tela-principal-estoque-cabecalho'>
          <h1>Estoque</h1>
        </div>

        <div className='tela-estoque-informacoes'>
          <div className='tela-estoque-titulo'>
            <h2>Registrar Entrada / Cadastrar Ingrediente</h2>
          </div>


          <div className='tela-estoque-inputs'>
            <div className='tela-estoque-input-ingrediente'>
              <p>Ingrediente Existente:</p>
              <select name="" id="">
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>

            <div className='tela-estoque-input-ingrediente-nome'>
              <p>Ingrediente Existente:</p>
              <input type="text" />
            </div>
          </div>

          <div className='tela-estoque-inputs-qtd'>
            <div className='input-unidade-medida'>
              <p>Unidade de Medida:</p>
              <select name="" id="">
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>

            <div className='input-quantidade-entrada'>
              <p>Quantidade de Entrada</p>
              <input type="number" />
            </div>

            <div className='input-custo'>
              <p>Custo Unitário (R$):</p>
              <input type="number" />
            </div>
          </div>

          <div className='tela-estoque-inputs-data'>
            <div className='input-data-entrada'>
              <p>Data de Entrada:</p>
              <input type="date" />
            </div>

            <div className='input-data-validade'>
              <p>Data de Validade (Opcional):</p>
              <input type="date" />
            </div>
          </div>

          <div className='tela-estoque-inputs-data'>
            <div className='input-data-entrada'>
              <p>Estoque Mínimo (Alerta):</p>
              <input type="number" />
            </div>

            <div className='input-data-validade'>
              <p>Fornecedor Padrão:</p>
              <input type="text" placeholder='Ex: Atacadão' />
            </div>
          </div>

          <div className='tela-estoque-botao'>
            <button className='btn-limpar-formulario'>Limpar Formulário</button>
            <button className='btn-registrar'>Registrar Entrada / Cadastrar</button>
          </div>
        </div>

        <div className='tela-estoque-informacoes'>
          <div className='tela-estoque-titulo'>
            <h2>Estoque Atual</h2>
          </div>

          <div className='estoque-pesquisar'>
            <div className='estoque-buscar-ingrediente'>
              <p>Buscar Ingrediente:</p>
              <input type="text" />
            </div>

            <div className='estoque-filtrar-ingrediente'>
              <p>Filtrar por Alerta:</p>
              <select name="" id="">
                <option value="">Todos</option>
                <option value="alerta">Com Alerta</option>
                <option value="sem-alerta">Sem Alerta</option>
              </select>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default Estoque