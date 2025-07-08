import React from 'react'
import BarraLateral from '../BarraLateral/BarraLateral'
import './VendasEPedidos.css'


const VendasEPedidos = () => {
  return (
    <>
        <BarraLateral/>
        <div className='tela-principal-vendas'>
            <div className='tela-principal-vendas-cabecalho'>
                <h1>Vendas e Pedidos</h1>
            </div>
        </div>
    </>
  )
}

export default VendasEPedidos