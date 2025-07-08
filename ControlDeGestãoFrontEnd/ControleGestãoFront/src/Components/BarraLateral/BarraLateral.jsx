import React from 'react'
import './BarraLateral.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCoins, faKitchenSet, faBoxOpen, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const BarraLateral = () => {
  return (
    <div className='barra-lateral'>
        <h1>Delivery</h1>
        <div className='menu'>
            <ul className='menu-list'>
                <li><FontAwesomeIcon icon={faCartShopping} className='menu-list-icons' />Vendas e Pedidos</li>
                <li><FontAwesomeIcon icon={faBoxOpen} className='menu-list-icons' />Estoque</li>
                <li><FontAwesomeIcon icon={faKitchenSet} className='menu-list-icons' />Receitas</li>
                <li><FontAwesomeIcon icon={faCoins} className='menu-list-icons' />Financeiro</li>
                <li><FontAwesomeIcon icon={faChartLine} className='menu-list-icons' />Relatórios</li>
            </ul>
        </div>
    </div>
    
  )
}

export default BarraLateral