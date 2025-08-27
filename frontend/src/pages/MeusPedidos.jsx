import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MeusPedidos() {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState(null);

    useEffect(() => {
        carregarMeusPedidos();
    }, []);

    const carregarMeusPedidos = async () => {
        try {
            // Buscar pedidos do cliente logado
            const clienteId = localStorage.getItem('clienteId') || sessionStorage.getItem('clienteId') || 1;
            const response = await fetch(`http://localhost:3001/api/cadastro-pedido/cliente/${clienteId}`);
            const data = await response.json();
            
            if (data.pedidos) {
                // Mapear os dados da API para o formato esperado pelo frontend
                const pedidosFormatados = data.pedidos.map(pedido => ({
                    id: pedido.id,
                    prestador: pedido.prestador_nome,
                    servico: pedido.servico_nome,
                    data: pedido.data,
                    preco: parseFloat(pedido.preco),
                    descricao: pedido.servico_descricao,
                    prestadorId: pedido.id_usuario_prestador,
                    servicoId: pedido.id_servico_prestado,
                    status: pedido.status || 'Pendente'
                }));
                setPedidos(pedidosFormatados);
            } else {
                setPedidos([]);
            }
        } catch (error) {
            console.error('Erro ao carregar meus pedidos:', error);
            setPedidos([]);
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

    const cancelarPedido = async (pedidoId) => {
        const confirmacao = window.confirm('Tem certeza que deseja cancelar este pedido? Esta ação não pode ser desfeita.');
        
        if (!confirmacao) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/cadastro-pedido/${pedidoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert('Pedido cancelado com sucesso!');
                // Recarregar a lista de pedidos
                await carregarMeusPedidos();
            } else {
                alert(`Erro ao cancelar pedido: ${data.erro || 'Erro desconhecido'}`);
            }
        } catch (error) {
            console.error('Erro ao cancelar pedido:', error);
            alert('Erro ao cancelar pedido. Verifique sua conexão e tente novamente.');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pendente':
                return 'text-yellow-400';
            case 'Aceito':
                return 'text-green-400';
            case 'Concluído':
                return 'text-blue-400';
            case 'Recusado':
                return 'text-red-400';
            default:
                return 'text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pendente':
                return '⏳';
            case 'Aceito':
                return '✅';
            case 'Concluído':
                return '🎉';
            case 'Recusado':
                return '❌';
            default:
                return '❓';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Header */}
            <div className="w-full bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50 shadow-2xl">
                <div className="flex justify-between items-center px-8 py-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-wide">Meus Pedidos</h1>
                        <p className="text-gray-300 font-medium">Acompanhe seus serviços solicitados</p>
                    </div>
                    <button 
                        className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 font-medium shadow-lg"
                        onClick={() => navigate('/homeCliente')}
                    >
                        ← Voltar
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                {/* Stats */}
                <div className="max-w-7xl mx-auto mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 text-center shadow-2xl transform transition-all duration-300 hover:scale-105">
                            <div className="text-3xl mb-2">📊</div>
                            <div className="text-2xl font-bold text-white">{pedidos.length}</div>
                            <div className="text-gray-400 font-medium">Total de Pedidos</div>
                        </div>
                        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 text-center shadow-2xl transform transition-all duration-300 hover:scale-105">
                            <div className="text-3xl mb-2">⏳</div>
                            <div className="text-2xl font-bold text-yellow-400">
                                {pedidos.filter(p => p.status === 'Pendente').length}
                            </div>
                            <div className="text-gray-400 font-medium">Pendentes</div>
                        </div>
                        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 text-center shadow-2xl transform transition-all duration-300 hover:scale-105">
                            <div className="text-3xl mb-2">✅</div>
                            <div className="text-2xl font-bold text-green-400">
                                {pedidos.filter(p => p.status === 'Aceito').length}
                            </div>
                            <div className="text-gray-400 font-medium">Aceitos</div>
                        </div>
                        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 text-center shadow-2xl transform transition-all duration-300 hover:scale-105">
                            <div className="text-3xl mb-2">💰</div>
                            <div className="text-2xl font-bold text-green-400">
                                R$ {pedidos.reduce((total, pedido) => total + pedido.preco, 0).toFixed(2)}
                            </div>
                            <div className="text-gray-400 font-medium">Total Investido</div>
                        </div>
                    </div>
                </div>

                {/* Pedidos */}
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-400 mx-auto mb-4"></div>
                            <p className="text-xl text-gray-300 font-medium">Carregando seus pedidos...</p>
                        </div>
                    ) : pedidos.length > 0 ? (
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-wide mb-8">Seus Pedidos ({pedidos.length})</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                                {pedidos.map((pedido) => (
                                    <div key={pedido.id} className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-900/50 border border-gray-700/50 ring-1 ring-gray-600/20 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-gray-500/25">
                                        <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-4">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-semibold tracking-wide">Pedido #{pedido.id}</h3>
                                                <div className="flex items-center">
                                                    <span className="mr-2">{getStatusIcon(pedido.status)}</span>
                                                    <span className={`text-sm font-medium ${getStatusColor(pedido.status)}`}>
                                                        {pedido.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-xl font-bold text-white mb-3 tracking-wide">{pedido.servico}</h4>
                                            <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                                                {pedido.descricao}
                                            </p>
                                            <div className="space-y-3 mb-6">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-300">Prestador:</span>
                                                    <span className="text-white font-medium">{pedido.prestador}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-300">Data:</span>
                                                    <span className="text-white font-medium">
                                                        {new Date(pedido.data).toLocaleDateString('pt-BR')}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-300">Valor:</span>
                                                    <span className="text-green-400 font-bold text-lg">
                                                        R$ {pedido.preco.toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <button 
                                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-2xl transition-all duration-300 text-sm font-semibold"
                                                    onClick={() => abrirDetalhes(pedido)}
                                                >
                                                    👁️ Ver Detalhes
                                                </button>
                                                {pedido.status === 'Pendente' && (
                                                    <button 
                                                        className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl font-semibold text-sm"
                                                        onClick={() => cancelarPedido(pedido.id)}
                                                    >
                                                        ❌ Cancelar
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-900/50 border border-gray-700/50 ring-1 ring-gray-600/20 p-12 max-w-md mx-auto">
                                <div className="text-8xl mb-8">📋</div>
                                <h3 className="text-white text-3xl font-bold mb-4 tracking-wide">Nenhum pedido encontrado</h3>
                                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                    Você ainda não fez nenhuma solicitação de serviço.
                                </p>
                                <button
                                    onClick={() => navigate('/solicitaServicos')}
                                    className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
                                >
                                    💼 Solicitar Serviços
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Detalhes */}
            {showDetailsModal && selectedPedido && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 border border-gray-700 max-h-[90vh] overflow-y-auto">
                        {/* Header do Modal */}
                        <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-4 rounded-t-2xl sticky top-0">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold tracking-wide">Detalhes do Pedido #{selectedPedido.id}</h3>
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
                                    <h5 className="text-lg font-semibold text-white mb-3">Status do Pedido</h5>
                                    <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-600">
                                        <div className="flex items-center justify-center">
                                            <span className="text-4xl mr-4">{getStatusIcon(selectedPedido.status)}</span>
                                            <div className="text-center">
                                                <div className={`text-2xl font-bold ${getStatusColor(selectedPedido.status)}`}>
                                                    {selectedPedido.status}
                                                </div>
                                                <div className="text-gray-400 text-sm mt-1">
                                                    Pedido feito em {new Date(selectedPedido.data).toLocaleDateString('pt-BR')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-lg font-semibold text-white mb-3">Serviço</h5>
                                    <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-600">
                                        <h6 className="text-white font-medium mb-2">{selectedPedido.servico}</h6>
                                        <p className="text-gray-300 text-sm mb-4">{selectedPedido.descricao}</p>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-lg font-semibold text-white mb-3">Prestador</h5>
                                    <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-600">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">👤</span>
                                            <div>
                                                <div className="text-white font-medium">{selectedPedido.prestador}</div>
                                                <div className="text-gray-400 text-sm">ID: {selectedPedido.prestadorId}</div>
                                            </div>
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
                                {selectedPedido.status === 'Pendente' && (
                                    <button
                                        onClick={async () => {
                                            fecharDetalhes();
                                            await cancelarPedido(selectedPedido.id);
                                        }}
                                        className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl font-semibold"
                                    >
                                        ❌ Cancelar Pedido
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}