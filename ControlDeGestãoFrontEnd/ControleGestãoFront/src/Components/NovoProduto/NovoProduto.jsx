import './NovoProduto.css'
import BarraLateral from '../BarraLateral/BarraLateral'
import DateTimeDisplay from '../../Hooks/DateTimeDisplay.jsx';

const NovoProduto = () => {
    return (
        <>
            <BarraLateral />
            <div className='tela-principal-novo-produto'>
                <div className='tela-principal-cadastrar-cabecalho'>
                    <h1>Cadastrar Novo Produto</h1>
                    <DateTimeDisplay/>
                </div>

                <div className='tela-principal-cadastrar'>

                </div>

            </div>
        </>
    )
}

export default NovoProduto