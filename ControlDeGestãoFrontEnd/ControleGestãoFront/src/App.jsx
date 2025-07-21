import { useState } from 'react'
import './App.css'
import TelaPrincipal from './Components/TelaPrincipal/TelaPrincipal.jsx'
import VendasEPedidos from './Components/VendasEPedidos/VendasEPedidos.jsx'
import Estoque from './Components/Estoque/Estoque.jsx'
import Receitas from './Components/Receitas/Receitas.jsx'
import Financeiro from './Components/Financeiro/Financeiro.jsx'
import Relatorio from './Components/Relatorio/Relatorio.jsx'
import NovoProduto from './Components/NovoProduto/NovoProduto.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaPrincipal />} />
        <Route path="/vendas" element={<VendasEPedidos />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/receitas" element={<Receitas />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/novo-produto" element={<NovoProduto/>}/>
      </Routes>
    </Router>
  )
}

export default App
