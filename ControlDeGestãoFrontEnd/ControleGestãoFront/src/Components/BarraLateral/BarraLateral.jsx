import React from 'react'
import './BarraLateral.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCoins, faKitchenSet, faBoxOpen, faCartShopping, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

const BarraLateral = () => {
  return (
    <div className='barra-lateral'>
      <h1 className='logo-titulo'>
        <Link to="/" className='logo-link'>
          Delivery
        </Link>
      </h1>
      <div className='menu'>
        <ul className='menu-list'>

          <li>
            <Link to="/novo-produto" className="menu-link">
              <FontAwesomeIcon icon={faPlus} className='menu-list-icons' />
              Cadastrar Produto
            </Link>
          </li>
          <li>
            <Link to="/vendas" className="menu-link">
              <FontAwesomeIcon icon={faCartShopping} className='menu-list-icons' />
              Vendas e Pedidos
            </Link>
          </li>

          <li>
            <Link to="/estoque" className="menu-link">
              <FontAwesomeIcon icon={faBoxOpen} className='menu-list-icons' />
              Estoque
            </Link>
          </li>

          <li>
            <Link to="/receitas" className="menu-link">
              <FontAwesomeIcon icon={faKitchenSet} className='menu-list-icons' />
              Receitas
            </Link>
          </li>

          <li>
            <Link to="/financeiro" className="menu-link">
              <FontAwesomeIcon icon={faCoins} className='menu-list-icons' />
              Financeiro
            </Link>
          </li>

          <li>
            <Link to="/relatorio" className="menu-link">
              <FontAwesomeIcon icon={faChartLine} className='menu-list-icons' />
              Relatórios
            </Link>
          </li>
        </ul>
      </div>
    </div>

  )
}

export default BarraLateral