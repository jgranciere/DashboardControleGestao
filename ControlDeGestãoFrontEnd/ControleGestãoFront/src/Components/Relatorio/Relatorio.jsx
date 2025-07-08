import React from 'react'
import BarraLateral from '../BarraLateral/BarraLateral'
import './Relatorio.css'

const Relatorio = () => {
  return (
    <>
        <BarraLateral/>
        <div className='tela-principal-relatorio'>
            <div className='tela-principal-relatorio-cabecalho'>
                <h1>Relatório</h1>
            </div>
        </div>
    </>
  )
}

export default Relatorio