import React from 'react'
import BarraLateral from '../BarraLateral/BarraLateral'
import './Relatorio.css'
import DateTimeDisplay from '../../Hooks/DateTimeDisplay.jsx';

const Relatorio = () => {
  return (
    <>
        <BarraLateral/>
        <div className='tela-principal-relatorio'>
            <div className='tela-principal-relatorio-cabecalho'>
                <h1>Relatório</h1>
                <DateTimeDisplay/>
            </div>
        </div>
    </>
  )
}

export default Relatorio