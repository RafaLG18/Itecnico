import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TelaHomePrestador() {
    const navigate = useNavigate();
    const [servicosSolicitados, setServicosSolicitados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState(null);

    useEffect(() => {
        carregarServicosSolicitados();
    }, []);

    const carregarServicosSolicitados = async () => {
        try {
            // Buscar pedidos do prestador logado
            const prestadorId = localStorage.getItem('prestadorId') || sessionStorage.getItem('prestadorId') || 1;
            const response = await fetch(`http://localhost:3001/api/cadastro-pedido/prestador/${prestadorId}`);
            const data = await response.json();
            
            if (data.pedidos) {
                // Mapear os dados da API para o formato esperado pelo frontend
                const pedidosFormatados = data.pedidos.map(pedido => ({
                    id: pedido.id,
                    cliente: pedido.cliente_nome,
                    servico: pedido.servico_nome,
                    data: pedido.data,
                    preco: parseFloat(pedido.preco),
                    descricao: pedido.servico_descricao,
                    clienteId: pedido.id_usuario_cliente,
                    servicoId: pedido.id_servico_prestado
                }));
                setServicosSolicitados(pedidosFormatados);
            } else {
                setServicosSolicitados([]);
            }
        } catch (error) {
            console.error('Erro ao carregar serviços solicitados:', error);
            setServicosSolicitados([]);
        } finally {
            setLoading(false);
        }
    };

    const abrirDetalhes = (pedido) => {
        setSelectedPedido(pedido);
        setShowDetailsModal(true);
    };

    const fecharDetalhes = () => {
        setShowDetailsModal(false);
        setSelectedPedido(null);
    };

    const aceitarPedido = async (pedidoId) => {
        try {
            // Aqui você pode implementar a lógica para aceitar o pedido
            // Por exemplo, atualizar o status do pedido no backend
            alert('Pedido aceito com sucesso!');
            
            // Recarregar a lista
            await carregarServicosSolicitados();
        } catch (error) {
            console.error('Erro ao aceitar pedido:', error);
            alert('Erro ao aceitar pedido. Tente novamente.');
        }
    };

    const recusarPedido = async (pedidoId) => {
        try {
            // Aqui você pode implementar a lógica para recusar o pedido
            alert('Pedido recusado.');
            
            // Recarregar a lista
            await carregarServicosSolicitados();
        } catch (error) {
            console.error('Erro ao recusar pedido:', error);
            alert('Erro ao recusar pedido. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="h-full">
                {/* Header */}
                <div className="w-full bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50 shadow-2xl">
                    <div className="flex justify-between items-center px-8 py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-wide">Painel do Prestador</h1>
                            <p className="text-gray-300 font-medium">Gerencie seus serviços</p>
                        </div>
                        <button 
                            className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 font-medium shadow-lg"
                            onClick={() => navigate('/')}
                        >
                            Sair
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Ações Rápidas */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-900/50 border border-gray-700/50 ring-1 ring-gray-600/20 h-full transform transition-all duration-500 hover:scale-105 hover:shadow-gray-500/25">
                                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-6 rounded-t-2xl">
                                    <h3 className="text-2xl font-bold tracking-wide">Ações Rápidas</h3>
                                </div>
                                <div className="p-8 flex flex-col justify-center space-y-6">
                                    <button 
                                        className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white py-4 px-6 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                                        onClick={() => navigate('/cadastroPrestador/cadastroServico')}
                                    >
                                        <span className="text-xl mr-3">+</span>
                                        Cadastrar Novo Serviço
                                    </button>
                                    <button 
                                        className="bg-gray-800/80 backdrop-blur-md border border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white py-4 px-6 rounded-2xl transition-all duration-300 font-semibold"
                                        onClick={() => navigate('/meus-servicos')}
                                    >
                                        Ver Meus Serviços
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Serviços Solicitados */}
                        <div className="lg:col-span-2">
                            <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-900/50 border border-gray-700/50 ring-1 ring-gray-600/20 h-full">
                                <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-6 rounded-t-2xl">
                                    <h3 className="text-2xl font-bold tracking-wide">Serviços Solicitados</h3>
                                </div>
                                <div className="p-8">
                                    {loading ? (
                                        <div className="text-center py-12">
                                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-400 mx-auto mb-4">
                                            </div>
                                            <p className="text-gray-300 font-medium">Carregando...</p>
                                        </div>
                                    ) : servicosSolicitados.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="w-full table-auto">
                                                <thead>
                                                    <tr className="border-b border-gray-600/50">
                                                        <th className="text-left py-4 px-4 font-semibold text-gray-300 tracking-wide">Cliente</th>
                                                        <th className="text-left py-4 px-4 font-semibold text-gray-300 tracking-wide">Serviço</th>
                                                        <th className="text-left py-4 px-4 font-semibold text-gray-300 tracking-wide">Data</th>
                                                        <th className="text-left py-4 px-4 font-semibold text-gray-300 tracking-wide">Valor</th>
                                                        <th className="text-left py-4 px-4 font-semibold text-gray-300 tracking-wide">Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {servicosSolicitados.map(servico => (
                                                        <tr key={servico.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-all duration-300">
                                                            <td className="py-4 px-4 text-white font-medium">{servico.cliente}</td>
                                                            <td className="py-4 px-4 text-gray-300">{servico.servico}</td>
                                                            <td className="py-4 px-4 text-gray-300">{new Date(servico.data).toLocaleDateString('pt-BR')}</td>
                                                            <td className="py-4 px-4 text-green-400 font-bold">R$ {servico.preco.toFixed(2)}</td>
                                                            <td className="py-4 px-4">
                                                                <div className="flex gap-2">
                                                                    <button 
                                                                        className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105"
                                                                        onClick={() => aceitarPedido(servico.id)}
                                                                    >
                                                                        ✓ Aceitar
                                                                    </button>
                                                                    <button 
                                                                        className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105"
                                                                        onClick={() => recusarPedido(servico.id)}
                                                                    >
                                                                        ✗ Recusar
                                                                    </button>
                                                                    <button 
                                                                        className="bg-gray-800/80 backdrop-blur-md border border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                                                                        onClick={() => abrirDetalhes(servico)}
                                                                    >
                                                                        👁️ Detalhes
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-16">
                                            <div className="text-6xl mb-6">📋</div>
                                            <h3 className="text-2xl font-bold text-white mb-4">Nenhuma solicitação</h3>
                                            <p className="text-gray-300 font-medium">Aguardando novos pedidos de serviços</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Estatísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8 text-center shadow-2xl transform transition-all duration-300 hover:scale-105">
                            <div className="text-4xl mb-4">📊</div>
                            <h5 className="text-lg font-medium text-gray-300 tracking-wide mb-2">Total de Serviços</h5>
                            <h2 className="text-4xl font-bold">{servicosSolicitados.length}</h2>
                        </div>
                        <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-2xl p-8 text-center shadow-2xl transform transition-all duration-300 hover:scale-105">
                            <div className="text-4xl mb-4">💰</div>
                            <h5 className="text-lg font-medium text-gray-300 tracking-wide mb-2">Receita Pendente</h5>
                            <h2 className="text-3xl font-bold text-green-400">
                                R$ {servicosSolicitados.reduce((total, servico) => total + servico.preco, 0).toFixed(2)}
                            </h2>
                        </div>
                        <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl p-8 text-center shadow-2xl transform transition-all duration-300 hover:scale-105">
                            <div className="text-4xl mb-4">⏳</div>
                            <h5 className="text-lg font-medium text-gray-300 tracking-wide mb-2">Pendentes</h5>
                            <h2 className="text-4xl font-bold text-yellow-400">{servicosSolicitados.length}</h2>
                        </div>
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8 text-center shadow-2xl transform transition-all duration-300 hover:scale-105">
                            <div className="text-4xl mb-4">✅</div>
                            <h5 className="text-lg font-medium text-gray-300 tracking-wide mb-2">Concluídos</h5>
                            <h2 className="text-4xl font-bold text-blue-400">0</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Detalhes */}
            {showDetailsModal && selectedPedido && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 border border-gray-700 max-h-[90vh] overflow-y-auto">
                        {/* Header do Modal */}
                        <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-4 rounded-t-2xl sticky top-0">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold tracking-wide">Detalhes do Pedido</h3>
                                <button 
                                    onClick={fecharDetalhes}
                                    className="text-gray-400 hover:text-white text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Conteúdo do Modal */}
                        <div className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <h5 className="text-lg font-semibold text-white mb-3">Informações do Cliente</h5>
                                    <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-600">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">👤</span>
                                            <div>
                                                <div className="text-white font-medium">{selectedPedido.cliente}</div>
                                                <div className="text-gray-400 text-sm">ID: {selectedPedido.clienteId}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-lg font-semibold text-white mb-3">Serviço Solicitado</h5>
                                    <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-600">
                                        <h6 className="text-white font-medium mb-2">{selectedPedido.servico}</h6>
                                        <p className="text-gray-300 text-sm mb-4">{selectedPedido.descricao}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Data solicitada:</span>
                                            <span className="text-white font-medium">
                                                {new Date(selectedPedido.data).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-lg font-semibold text-white mb-3">Valor</h5>
                                    <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-600 text-center">
                                        <div className="text-3xl font-bold text-green-400">
                                            R$ {selectedPedido.preco.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Botões de Ação */}
                            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
                                <button
                                    onClick={fecharDetalhes}
                                    className="flex-1 border border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white px-4 py-3 rounded-2xl transition-all duration-300 font-medium"
                                >
                                    Fechar
                                </button>
                                <button
                                    onClick={() => {
                                        fecharDetalhes();
                                        recusarPedido(selectedPedido.id);
                                    }}
                                    className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl font-semibold"
                                >
                                    ✗ Recusar
                                </button>
                                <button
                                    onClick={() => {
                                        fecharDetalhes();
                                        aceitarPedido(selectedPedido.id);
                                    }}
                                    className="flex-1 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl font-semibold"
                                >
                                    ✓ Aceitar Pedido
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
