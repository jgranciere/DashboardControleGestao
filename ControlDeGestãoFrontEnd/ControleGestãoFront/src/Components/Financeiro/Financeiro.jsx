import React from 'react'
import BarraLateral from '../BarraLateral/BarraLateral'
import './Financeiro.css'

const Financeiro = () => {
  return (
    <>
        <BarraLateral/>
        <div className='tela-principal-financeiro'>
            <div className='tela-principal-financeiro-cabecalho'>
                <h1>Financeiro</h1>
            </div>
        </div>
    </>
  )
}

export default Financeiro