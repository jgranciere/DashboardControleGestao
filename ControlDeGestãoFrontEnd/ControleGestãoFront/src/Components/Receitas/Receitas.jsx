import React from 'react'
import BarraLateral from '../BarraLateral/BarraLateral'
import './Receitas.css'

const Receitas = () => {
  return (
    <>
        <BarraLateral/>
        <div className='tela-principal-receitas'>
            <div className='tela-principal-receitas-cabecalho'>
                <h1>Receitas</h1>
            </div>
        </div>
    </>
  )
}

export default Receitas