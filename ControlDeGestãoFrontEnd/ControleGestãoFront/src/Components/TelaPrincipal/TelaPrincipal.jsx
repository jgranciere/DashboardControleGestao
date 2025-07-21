import React, { useState, useEffect } from 'react';
import './TelaPrincipal.css'
import BarraLateral from '../BarraLateral/BarraLateral.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faChartLine, faMagnifyingGlass, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import DateTimeDisplay from '../../Hooks/DateTimeDisplay.jsx';

const TelaPrincipal = () => {
    return (
        <>
        <BarraLateral />
        <div className='tela-principal'>
            <div className='tela-principal-cabecalho'>
                <h1>Dashboard de Gestão</h1>
                <DateTimeDisplay/>
            </div>

            <div className='tela-principal-informacoes'>
                <div className='tela-principal-informacoes-card'>
                    <p>Vendas Totais</p>
                    <div className='tela-principal-informacoes-card-valor'>
                        <h1>R$</h1>
                        <h1>520,00</h1>
                    </div>
                </div>

                <div className='tela-principal-informacoes-card'>
                    <p>Despesas</p>
                    <div className='tela-principal-informacoes-card-valor'>
                        <h1>R$</h1>
                        <h1>520,00</h1>
                    </div>
                </div>

                <div className='tela-principal-informacoes-card'>
                    <p>Lucro Bruto</p>
                    <div className='tela-principal-informacoes-card-valor'>
                        <h1>R$</h1>
                        <h1>520,00</h1>
                    </div>
                </div>

                <div className='tela-principal-informacoes-card'>
                    <p>Lucro Liquido</p>
                    <div className='tela-principal-informacoes-card-valor'>
                        <h1>R$</h1>
                        <h1>520,00</h1>
                    </div>
                </div>
            </div>

            <div className='tela-principal-graficos'>
                <div className='tela-principal-graficos-card'>
                    <h1>Alerta de Estoque</h1>
                </div>
                <div className='tela-principal-graficos-card'>
                    <h1>Ações Rápidas</h1>
                    <div className='tela-principal-graficos-card-acoes-buttons'>
                        <button className='acao-rapida-botao acao-venda'>
                            <FontAwesomeIcon icon={faPlus} className='acao-rapida-icons' />
                            <div className='acao-rapida-responsividade'>
                                <span>Registrar Nova Venda</span>
                            </div>
                            
                        </button>
                        <button className='acao-rapida-botao acao-despesa'>
                            <FontAwesomeIcon icon={faMinus} className='acao-rapida-icons' />
                            <div className='acao-rapida-responsividade'>
                                <span>Registrar Nova Despesa</span>
                            </div>

                        </button>
                        <button className='acao-rapida-botao acao-estoque-entrada'>
                            <FontAwesomeIcon icon={faBoxOpen} className='acao-rapida-icons'/>
                            <div className='acao-rapida-responsividade'>
                                <span>Registrar Entrada Estoque</span>
                            </div>

                        </button>
                        <button className='acao-rapida-botao acao-estoque-consulta'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='acao-rapida-icons'/>
                            <div className='acao-rapida-responsividade'>
                                <span>Consultar Estoque</span>
                            </div>
                        </button>

                        <button className='acao-rapida-botao acao-relatorio'>
                            <FontAwesomeIcon icon={faChartLine} className='acao-rapida-icons'/>
                            <div className='acao-rapida-responsividade'>
                                <span>Visualizar Relatórios</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default TelaPrincipal