import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function HomeCliente() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        ativos: 0,
        concluidos: 0,
        totalInvestido: 0
    });
    
    useEffect(() => {
        carregarEstatisticas();
    }, []);

    const carregarEstatisticas = async () => {
        try {
            const clienteId = localStorage.getItem('clienteId') || sessionStorage.getItem('clienteId') || 1;
            const response = await fetch(`http://localhost:3001/api/cadastro-pedido/cliente/${clienteId}`);
            const data = await response.json();
            
            if (data.pedidos) {
                const pedidos = data.pedidos;
                setStats({
                    total: pedidos.length,
                    ativos: pedidos.filter(p => p.status !== 'Concluído').length, // Por enquanto todos são ativos
                    concluidos: pedidos.filter(p => p.status === 'Concluído').length,
                    totalInvestido: pedidos.reduce((total, p) => total + parseFloat(p.preco), 0)
                });
            }
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Header */}
            <div className="w-full bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50 shadow-2xl">
                <div className="flex justify-between items-center px-8 py-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-wide">Painel do Cliente</h1>
                        <p className="text-gray-300 font-medium">Bem-vindo de volta</p>
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
            <div className="p-8">
                {/* Action Cards */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Solicitar Serviços Card */}
                        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-900/50 border border-gray-700/50 ring-1 ring-gray-600/20 p-10 transform transition-all duration-500 hover:scale-105 hover:shadow-gray-500/25">
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-gray-700 to-gray-900 w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                                    <span className="text-3xl text-white">💼</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white tracking-wide mb-6">Solicitar Serviços</h3>
                                <p className="text-gray-300 mb-8 font-medium text-lg">Encontre profissionais qualificados para suas necessidades</p>
                                <button 
                                    className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 text-lg"
                                    onClick={() => navigate('/solicitaServicos')}
                                >
                                    Solicitar Serviço
                                </button>
                            </div>
                        </div>

                        {/* Meus Pedidos Card */}
                        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-900/50 border border-gray-700/50 ring-1 ring-gray-600/20 p-10 transform transition-all duration-500 hover:scale-105 hover:shadow-gray-500/25">
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-gray-700 to-gray-900 w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                                    <span className="text-3xl text-white">📋</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white tracking-wide mb-6">Meus Pedidos</h3>
                                <p className="text-gray-300 mb-8 font-medium text-lg">Acompanhe o status de seus serviços solicitados</p>
                                <button 
                                    className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 text-lg"
                                    onClick={() => navigate('/meus-pedidos')}
                                >
                                    Ver Pedidos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="max-w-4xl mx-auto mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-center shadow-xl">
                            <h4 className="text-2xl font-bold text-white mb-2">{stats.total}</h4>
                            <p className="text-gray-300 font-medium">Total de Pedidos</p>
                        </div>
                        <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl p-6 text-center shadow-xl">
                            <h4 className="text-2xl font-bold text-yellow-400 mb-2">{stats.ativos}</h4>
                            <p className="text-gray-300 font-medium">Pedidos Ativos</p>
                        </div>
                        <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-6 text-center shadow-xl">
                            <h4 className="text-2xl font-bold text-green-400 mb-2">{stats.concluidos}</h4>
                            <p className="text-gray-300 font-medium">Concluídos</p>
                        </div>
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-center shadow-xl">
                            <h4 className="text-2xl font-bold text-green-400 mb-2">R$ {stats.totalInvestido.toFixed(2)}</h4>
                            <p className="text-gray-300 font-medium">Total Investido</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
