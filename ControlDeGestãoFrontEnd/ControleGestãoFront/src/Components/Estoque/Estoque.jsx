import React from 'react'
import BarraLateral from '../BarraLateral/BarraLateral'
import './Estoque.css'

const Estoque = () => {
  return (
    <>
        <BarraLateral/>
        <div className='tela-principal-estoque'>
            <div className='tela-principal-estoque-cabecalho'>
                <h1>Estoque</h1>
            </div>
        </div>
    </>
  )
}

export default Estoque