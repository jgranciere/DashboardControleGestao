import React, { useState, useEffect } from 'react';
import BarraLateral from '../BarraLateral/BarraLateral';
import './Estoque.css'; // Seu arquivo CSS customizado
import DateTimeDisplay from '../../Hooks/DateTimeDisplay.jsx';

const API_BASE_URL = 'https://localhost:7298';

const Estoque = () => {
  const [selectedIngredientId, setSelectedIngredientId] = useState(''); 
  const [nomeIngrediente, setNomeIngrediente] = useState(''); 
  const [unidadeMedida, setUnidadeMedida] = useState('KG'); 
  const [quantidadeEntrada, setQuantidadeEntrada] = useState(0); 
  const [custoUnitarioEntrada, setCustoUnitarioEntrada] = useState(0); 
  const [dataEntrada, setDataEntrada] = useState(new Date().toISOString().split('T')[0]); 
  const [dataValidade, setDataValidade] = useState(''); 
  const [estoqueMinimoForm, setEstoqueMinimoForm] = useState(0); 
  const [fornecedorPadrao, setFornecedorPadrao] = useState(''); 
  const [isEditing, setIsEditing] = useState(false); 

  const [ingredientesCadastrados, setIngredientesCadastrados] = useState([]); 
  const [filtroBusca, setFiltroBusca] = useState(''); 
  const [filtroStatusAlerta, setFiltroStatusAlerta] = useState('Todos'); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIngredientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/Ingrediente`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      setIngredientesCadastrados(data);
    } catch (err) {
      console.error("Erro ao buscar ingredientes:", err);
      setError("Não foi possível carregar os ingredientes. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredientes();
  }, []); 

  const handleSelectIngredient = (e) => {
    const id = parseInt(e.target.value);
    setSelectedIngredientId(id);
    if (id) {
      const ingrediente = ingredientesCadastrados.find(ing => ing.id === id);
      if (ingrediente) {
        setNomeIngrediente(ingrediente.nome);
        setUnidadeMedida(ingrediente.unidadeMedida);
        setEstoqueMinimoForm(ingrediente.estoqueMinimo);
        setFornecedorPadrao(ingrediente.fornecedorPadrao || '');
        setDataValidade(ingrediente.dataValidadeProxima ? new Date(ingrediente.dataValidadeProxima).toISOString().split('T')[0] : '');
        setQuantidadeEntrada(0); 
        setCustoUnitarioEntrada(0); 
        setIsEditing(true); 
      }
    } else {
      handleLimparFormulario();
      setIsEditing(false);
    }
  };

  const handleRegistrarEntrada = async () => {
    if (!nomeIngrediente.trim()) {
      alert('O nome do ingrediente é obrigatório.');
      return;
    }
    if (quantidadeEntrada < 0 || custoUnitarioEntrada < 0) {
      alert('Quantidade e Custo Unitário da entrada não podem ser negativos.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let ingredienteIdParaEntrada = selectedIngredientId;
      let ingredienteAtualizado = null;

      if (!isEditing) { 
        const newIngredienteData = {
          nome: nomeIngrediente,
          unidadeMedida: unidadeMedida,
          estoqueMinimo: estoqueMinimoForm,
          fornecedorPadrao: fornecedorPadrao,
        };

        const responseNewIng = await fetch(`${API_BASE_URL}/api/Ingrediente`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newIngredienteData),
        });

        if (!responseNewIng.ok) {
          const errorData = await responseNewIng.json();
          throw new Error(`Erro ao cadastrar ingrediente: ${errorData.title || responseNewIng.statusText}`);
        }
        const createdIngrediente = await responseNewIng.json();
        ingredienteIdParaEntrada = createdIngrediente.id;
        ingredienteAtualizado = createdIngrediente;
        alert(`Ingrediente "${createdIngrediente.nome}" cadastrado com sucesso!`);
      } else {
        const updatedIngredienteData = {
          nome: nomeIngrediente,
          unidadeMedida: unidadeMedida,
          estoqueMinimo: estoqueMinimoForm,
          fornecedorPadrao: fornecedorPadrao,
        };

        const responseUpdateIng = await fetch(`${API_BASE_URL}/api/Ingrediente/${selectedIngredientId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedIngredienteData),
        });

        if (!responseUpdateIng.ok) {
          const errorData = await responseUpdateIng.json();
          throw new Error(`Erro ao atualizar ingrediente: ${errorData.title || responseUpdateIng.statusText}`);
        }
        alert(`Dados cadastrais do ingrediente "${nomeIngrediente}" atualizados!`);
      }

      if (quantidadeEntrada > 0 || custoUnitarioEntrada > 0) {
        const entradaData = {
          idIngrediente: ingredienteIdParaEntrada,
          quantidadeEntrada: quantidadeEntrada,
          custoUnitario: custoUnitarioEntrada,
          dataEntrada: dataEntrada,
          dataValidade: dataValidade || null,
        };

        const responseEntrada = await fetch(`${API_BASE_URL}/api/Ingrediente/entrada`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entradaData),
        });

        if (!responseEntrada.ok) {
          const errorData = await responseEntrada.json();
          throw new Error(`Erro ao registrar entrada de estoque: ${errorData.title || responseEntrada.statusText}`);
        }
        ingredienteAtualizado = await responseEntrada.json(); 
        alert('Entrada de estoque registrada com sucesso!');
      }

      fetchIngredientes();
      handleLimparFormulario(); 

    } catch (err) {
      console.error("Erro na operação de estoque:", err);
      setError(`Erro: ${err.message}`);
      alert(`Erro na operação: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLimparFormulario = () => {
    setSelectedIngredientId('');
    setNomeIngrediente('');
    setUnidadeMedida('KG');
    setQuantidadeEntrada(0);
    setCustoUnitarioEntrada(0);
    setDataEntrada(new Date().toISOString().split('T')[0]);
    setDataValidade('');
    setEstoqueMinimoForm(0);
    setFornecedorPadrao('');
    setIsEditing(false); 
  };

  const getStatusAlerta = (ingrediente) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    let status = { text: 'Normal', colorClass: 'status-normal' }; 

    if (ingrediente.dataValidadeProxima) {
      const validade = new Date(ingrediente.dataValidadeProxima);
      validade.setHours(0, 0, 0, 0);
      const diffTime = validade.getTime() - hoje.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 0) {
        status = { text: 'Vencido!', colorClass: 'status-vencido' };
      } else if (diffDays <= 7) {
        status = { text: 'Venc. Próximo', colorClass: 'status-proximo-validade' };
      }
    }

    if (ingrediente.quantidadeEstoque <= ingrediente.estoqueMinimo * 0.5) {
      status = { text: 'Estoque Crítico', colorClass: 'status-critico' };
    } else if (ingrediente.quantidadeEstoque <= ingrediente.estoqueMinimo) {
      status = { text: 'Abaixo do Mínimo', colorClass: 'status-abaixo-minimo' };
    }

    return status;
  };

  const handleEditIngrediente = (ingredienteId) => {
    const ingrediente = ingredientesCadastrados.find(ing => ing.id === ingredienteId);
    if (ingrediente) {
      setSelectedIngredientId(ingrediente.id);
      setNomeIngrediente(ingrediente.nome);
      setUnidadeMedida(ingrediente.unidadeMedida);
      setEstoqueMinimoForm(ingrediente.estoqueMinimo);
      setFornecedorPadrao(ingrediente.fornecedorPadrao || '');
      setDataValidade(ingrediente.dataValidadeProxima ? new Date(ingrediente.dataValidadeProxima).toISOString().split('T')[0] : '');
      setQuantidadeEntrada(0);
      setCustoUnitarioEntrada(0); 
      setIsEditing(true); 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  };

  const handleRegistrarNovaEntradaAtalho = (ingredienteId) => {
    const ingrediente = ingredientesCadastrados.find(ing => ing.id === ingredienteId);
    if (ingrediente) {
      handleLimparFormulario(); 
      setSelectedIngredientId(ingrediente.id);
      setNomeIngrediente(ingrediente.nome);
      setUnidadeMedida(ingrediente.unidadeMedida);
      setEstoqueMinimoForm(ingrediente.estoqueMinimo);
      setFornecedorPadrao(ingrediente.fornecedorPadrao || '');
      setIsEditing(true); 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
      alert('Formulário preenchido para nova entrada. Insira a quantidade e o custo.');
    }
  };

  const handleDeleteIngrediente = async (ingredienteId, nomeIngrediente) => {
    if (window.confirm(`Tem certeza que deseja excluir o ingrediente "${nomeIngrediente}"? Esta ação é irreversível.`)) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/Ingrediente/${ingredienteId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Erro ao excluir ingrediente: ${response.statusText}`);
        }

        alert(`Ingrediente "${nomeIngrediente}" excluído com sucesso!`);
        fetchIngredientes(); 
      } catch (err) {
        console.error("Erro ao excluir ingrediente:", err);
        setError(`Erro: ${err.message}`);
        alert(`Erro ao excluir: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const ingredientesFiltrados = ingredientesCadastrados.filter(ingrediente => {
    const matchesSearch = ingrediente.nome.toLowerCase().includes(filtroBusca.toLowerCase());
    const statusAlerta = getStatusAlerta(ingrediente).text;
    const matchesStatus = filtroStatusAlerta === 'Todos' || statusAlerta.includes(filtroStatusAlerta);

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <BarraLateral />
      <div className='tela-principal-estoque'>
        <div className='tela-principal-estoque-cabecalho'>
          <h1>Estoque</h1>
          <DateTimeDisplay />
        </div>

        {loading && (
          <div className="mensagem-alerta loading">
            Carregando dados...
          </div>
        )}
        {error && (
          <div className="mensagem-alerta error">
            {error}
          </div>
        )}

        <div className='tela-estoque-informacoes'>
          <div className='tela-estoque-titulo'>
            <h2>{isEditing ? 'Editar Ingrediente / Registrar Entrada' : 'Registrar Entrada / Cadastrar Ingrediente'}</h2>
          </div>

          <div className='tela-estoque-inputs'>
            <div className='tela-estoque-input-ingrediente'>
              <p>Ingrediente Existente:</p>
              <select
                name="selectedIngredient"
                id="selectedIngredient"
                value={selectedIngredientId}
                onChange={handleSelectIngredient}
              >
                <option value="">-- Selecione ou Cadastre Novo --</option>
                {ingredientesCadastrados.map(ing => (
                  <option key={ing.id} value={ing.id}>{ing.nome}</option>
                ))}
              </select>
            </div>

            <div className='tela-estoque-input-ingrediente-nome'>
              <p>Nome do Ingrediente:</p>
              <input
                type="text"
                value={nomeIngrediente}
                onChange={(e) => setNomeIngrediente(e.target.value)}
                disabled={selectedIngredientId !== '' && isEditing}
              />
            </div>
          </div>

          <div className='tela-estoque-inputs-qtd'>
            <div className='input-unidade-medida'>
              <p>Unidade de Medida:</p>
              <select
                name="unidadeMedida"
                id="unidadeMedida"
                value={unidadeMedida}
                onChange={(e) => setUnidadeMedida(e.target.value)}
                disabled={selectedIngredientId !== '' && isEditing}
              >
                <option value="KG">KG</option>
                <option value="UN">UN</option>
                <option value="LT">LT</option>
                <option value="G">G</option>
                <option value="ML">ML</option>
                <option value="PCT">PCT</option>
              </select>
            </div>

            <div className='input-quantidade-entrada'>
              <p>Quantidade de Entrada</p>
              <input
                type="number"
                value={quantidadeEntrada}
                onChange={(e) => setQuantidadeEntrada(parseFloat(e.target.value))}
                min="0"
                step="0.01"
              />
            </div>

            <div className='input-custo'>
              <p>Custo Unitário (R$):</p>
              <input
                type="number"
                value={custoUnitarioEntrada}
                onChange={(e) => setCustoUnitarioEntrada(parseFloat(e.target.value))}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className='tela-estoque-inputs-data'>
            <div className='input-data-entrada'>
              <p>Data de Entrada:</p>
              <input
                type="date"
                value={dataEntrada}
                onChange={(e) => setDataEntrada(e.target.value)}
              />
            </div>

            <div className='input-data-validade'>
              <p>Data de Validade (Opcional):</p>
              <input
                type="date"
                value={dataValidade}
                onChange={(e) => setDataValidade(e.target.value)}
              />
            </div>
          </div>

          <div className='tela-estoque-inputs-data'>
            <div className='input-data-entrada'>
              <p>Estoque Mínimo (Alerta):</p>
              <input
                type="number"
                value={estoqueMinimoForm}
                onChange={(e) => setEstoqueMinimoForm(parseFloat(e.target.value))}
                min="0"
                step="0.01"
              />
            </div>

            <div className='input-data-validade'>
              <p>Fornecedor Padrão:</p>
              <input
                type="text"
                value={fornecedorPadrao}
                onChange={(e) => setFornecedorPadrao(e.target.value)}
                placeholder='Ex: Atacadão'
              />
            </div>
          </div>

          <div className='tela-estoque-botao'>
            <button className='btn-limpar-formulario' onClick={handleLimparFormulario}>Limpar Formulário</button>
            <button className='btn-registrar' onClick={handleRegistrarEntrada}>
              {isEditing ? 'Atualizar Dados / Registrar Entrada' : 'Registrar Entrada / Cadastrar'}
            </button>
          </div>
        </div>

        <div className='tela-estoque-informacoes'>
          <div className='tela-estoque-titulo'>
            <h2>Estoque Atual</h2>
          </div>

          <div className='estoque-pesquisar'>
            <div className='estoque-buscar-ingrediente'>
              <p>Buscar Ingrediente:</p>
              <input
                type="text"
                value={filtroBusca}
                onChange={(e) => setFiltroBusca(e.target.value)}
              />
            </div>

            <div className='estoque-filtrar-ingrediente'>
              <p>Filtrar por Alerta:</p>
              <select
                name="filtroAlerta"
                id="filtroAlerta"
                value={filtroStatusAlerta}
                onChange={(e) => setFiltroStatusAlerta(e.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="Estoque Crítico">Estoque Crítico</option>
                <option value="Abaixo do Mínimo">Abaixo do Mínimo</option>
                <option value="Venc. Próximo">Próximo da Validade</option>
                <option value="Vencido!">Vencido</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
          </div>

          <div className="estoque-tabela-container"> 
            <table className="estoque-tabela"> 
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Unidade</th>
                  <th>Qtd. Estoque</th>
                  <th>Estoque Mín.</th>
                  <th>Custo Médio</th>
                  <th>Validade Próx.</th>
                  <th>Fornecedor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {ingredientesFiltrados.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="10" className="estoque-tabela-mensagem">Nenhum ingrediente encontrado com os filtros aplicados.</td>
                  </tr>
                ) : (
                  ingredientesFiltrados.map(ing => {
                    const status = getStatusAlerta(ing);
                    return (
                      <tr key={ing.id}>
                        <td>{ing.id}</td>
                        <td>{ing.nome}</td>
                        <td>{ing.unidadeMedida}</td>
                        <td>{ing.quantidadeEstoque.toFixed(2)}</td>
                        <td>{ing.estoqueMinimo.toFixed(2)}</td>
                        <td>R$ {ing.custoMedio.toFixed(2)}</td>
                        <td>
                          {ing.dataValidadeProxima ? new Date(ing.dataValidadeProxima).toLocaleDateString('pt-BR') : 'N/A'}
                        </td>
                        <td>{ing.fornecedorPadrao || 'N/A'}</td>
                        <td>
                          <span className={status.colorClass}>
                            {status.text}
                          </span>
                        </td>
                        <td>
                          <div className="estoque-tabela-acoes"> 
                            <button
                              onClick={() => handleEditIngrediente(ing.id)}
                              className="btn-acao-editar"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleRegistrarNovaEntradaAtalho(ing.id)}
                              className="btn-acao-entrada"
                            >
                              + Entrada
                            </button>
                            <button
                              onClick={() => handleDeleteIngrediente(ing.id, ing.nome)}
                              className="btn-acao-excluir"
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="estoque-paginacao">
            <span>Página 1 de X</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Estoque;
