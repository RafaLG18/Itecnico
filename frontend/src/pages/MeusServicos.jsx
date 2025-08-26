import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MeusServicos() {
  const navigate = useNavigate();
  const [meusServicos, setMeusServicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarMeusServicos();
  }, []);
  
  const carregarMeusServicos = async () => {
    try {
      // Aqui você faria a requisição para buscar os serviços do prestador
      const response = await fetch(
        "http://localhost:3001/api/cadastro-servico-prestado",
      );
      const data = await response.json();
      console.log(data)
      
      // Mapear os dados da API para o formato esperado pelo frontend
      const servicosMapeados = data.servicos?.map(servico => ({
        id: servico.id,
        nome: servico.nome,
        descricao: servico.descricao,
        preco: parseFloat(servico.preco),
        categoria: "Serviço Geral", // Por enquanto fixo, pode ser melhorado
        ativo: true // Por enquanto fixo, pode ser melhorado
      })) || [];
      
      setMeusServicos(servicosMapeados);

      // Dados simulados para demonstração
      // Para testar sem serviços, comente as linhas abaixo
      // setMeusServicos([]);
    } catch (error) {
      console.error("Erro ao carregar meus serviços:", error);
    } finally {
      setLoading(false);
    }
  };

  const editarServico = (id) => {
    // Navegar para tela de edição
    navigate(`/editar-servico/${id}`);
  };

  const toggleStatus = (id) => {
    setMeusServicos((prevServicos) =>
      prevServicos.map((servico) =>
        servico.id === id ? { ...servico, ativo: !servico.ativo } : servico,
      ),
    );
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-full">
        {/* Header */}
        <div className="w-full bg-gray-800 text-white py-3">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-2xl font-bold">Meus Serviços</h2>
            <div className="flex gap-2">
              <button
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition-colors"
                onClick={() => navigate("/cadastroPrestador/cadastroServico")}
              >
                <i className="fas fa-plus mr-2"></i>
                Novo Serviço
              </button>
              <button
                className="border border-white text-white hover:bg-white hover:text-gray-800 px-4 py-2 rounded transition-colors"
                onClick={() => navigate("/homePrestador")}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full p-4">
          {loading ? (
            <div className="text-center mt-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto">
              </div>
              <p className="mt-4 text-gray-600">Carregando seus serviços...</p>
            </div>
          ) : meusServicos.length > 0 ? (
            <div>
              {/* Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8 text-center shadow-2xl transform transition-all duration-300 hover:scale-105">
                  <div className="text-4xl mb-4">📊</div>
                  <h5 className="text-lg font-medium text-gray-300 tracking-wide mb-2">Total</h5>
                  <h2 className="text-4xl font-bold">{meusServicos.length}</h2>
                </div>
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-2xl p-8 text-center shadow-2xl transform transition-all duration-300 hover:scale-105">
                  <div className="text-4xl mb-4">✅</div>
                  <h5 className="text-lg font-medium text-gray-300 tracking-wide mb-2">Ativos</h5>
                  <h2 className="text-4xl font-bold text-green-400">
                    {meusServicos.filter((s) => s.ativo).length}
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl p-8 text-center shadow-2xl transform transition-all duration-300 hover:scale-105">
                  <div className="text-4xl mb-4">❌</div>
                  <h5 className="text-lg font-medium text-gray-300 tracking-wide mb-2">Inativos</h5>
                  <h2 className="text-4xl font-bold text-red-400">
                    {meusServicos.filter((s) => !s.ativo).length}
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8 text-center shadow-2xl transform transition-all duration-300 hover:scale-105">
                  <div className="text-4xl mb-4">💰</div>
                  <h5 className="text-lg font-medium text-gray-300 tracking-wide mb-2">Preço Médio</h5>
                  <h2 className="text-3xl font-bold text-yellow-400">
                    R${" "}
                    {(
                      meusServicos.reduce(
                        (total, s) => total + s.preco,
                        0,
                      ) / meusServicos.length
                    ).toFixed(0)}
                  </h2>
                </div>
              </div>

              {/* Lista de Serviços */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {meusServicos.map((servico) => (
                  <div key={servico.id} className={`bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-900/50 border border-gray-700/50 ring-1 ring-gray-600/20 overflow-hidden h-full flex flex-col transform transition-all duration-500 hover:scale-105 hover:shadow-gray-500/25 ${!servico.ativo ? "opacity-75" : ""}`}>
                    <div
                      className={`px-6 py-4 flex justify-between items-center ${servico.ativo ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white" : "bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300"}`}
                    >
                      <h6 className="font-semibold tracking-wide">{servico.categoria}</h6>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${servico.ativo ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                      >
                        {servico.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h5 className="text-xl font-bold text-white mb-3 tracking-wide">{servico.nome}</h5>
                      <p className="text-gray-300 mb-6 flex-1 leading-relaxed">
                        {servico.descricao}
                      </p>
                      <div className="mt-auto">
                        <h4 className="text-3xl font-bold text-green-400 mb-6">
                          R$ {servico.preco.toFixed(2)}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <button
                              className={`flex-1 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${servico.ativo ? "bg-red-500/80 hover:bg-red-500 text-white" : "bg-green-500/80 hover:bg-green-500 text-white"}`}
                              onClick={() => toggleStatus(servico.id)}
                            >
                              {servico.ativo ? "Desativar" : "Ativar"}
                            </button>
                            <button
                              className="flex-1 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                              onClick={() => editarServico(servico.id)}
                            >
                              📝 Editar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center mt-20">
              <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-900/50 border border-gray-700/50 ring-1 ring-gray-600/20 p-12 max-w-md mx-auto">
                <div className="text-8xl mb-8">🔧</div>
                <h3 className="text-white text-3xl font-bold mb-4 tracking-wide">Nenhum serviço cadastrado</h3>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Você ainda não cadastrou nenhum serviço. <br />
                  Comece oferecendo seus serviços para os clientes!
                </p>
                <button
                  className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  onClick={() => navigate("/cadastroPrestador/cadastroServico")}
                >
                  <span className="text-xl mr-3">+</span>
                  Cadastrar Primeiro Serviço
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
