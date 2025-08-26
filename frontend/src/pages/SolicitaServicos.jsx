import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SolicitaServico() {
    const navigate = useNavigate();
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [requestDate, setRequestDate] = useState('');
    const [requestMessage, setRequestMessage] = useState('');

    useEffect(() => {
        carregarServicosDisponiveis();
    }, []);

    const carregarServicosDisponiveis = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/cadastro-servico-prestado');
            const data = await response.json();
            
            if (data.servicos && data.servicos.length > 0) {
                const servicosFormatados = data.servicos.map(servico => ({
                    id: servico.id,
                    nome: servico.nome,
                    descricao: servico.descricao,
                    preco: parseFloat(servico.preco),
                    categoria: 'Serviço Técnico',
                    prestadorId: servico.id_prestador,
                    prestador: `Prestador #${servico.id_prestador}`
                }));
                setServicos(servicosFormatados);
            } else {
                setServicos([]);
            }
        } catch (error) {
            console.error('Erro ao carregar serviços:', error);
            setServicos([]);
        } finally {
            setLoading(false);
        }
    };

    const categorias = ['Todas', 'Informática', 'Rede', 'Desenvolvimento', 'Design', 'Consultoria', 'Segurança', 'Educação', 'Serviço Técnico'];

    const filteredServicos = servicos.filter(servico => {
        const matchesSearch = servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            servico.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            servico.prestador.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todas' || servico.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const abrirModalSolicitacao = (servico) => {
        setSelectedService(servico);
        setShowModal(true);
        const today = new Date().toISOString().split('T')[0];
        setRequestDate(today);
        setRequestMessage('');
    };

    const fecharModal = () => {
        setShowModal(false);
        setSelectedService(null);
        setRequestDate('');
        setRequestMessage('');
    };

    const solicitarServico = async () => {
        if (!selectedService || !requestDate) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        try {
            const clienteId = localStorage.getItem('clienteId') || sessionStorage.getItem('clienteId') || 1;
            
            const response = await fetch('http://localhost:3001/api/cadastro-pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_usuario_cliente: parseInt(clienteId),
                    id_usuario_prestador: selectedService.prestadorId,
                    id_servico_prestado: selectedService.id,
                    data: requestDate,
                    preco: selectedService.preco
                }),
            });

            if (response.ok) {
                alert(`Solicitação enviada com sucesso!\n\nServiço: ${selectedService.nome}\nPrestador: ${selectedService.prestador}\nData: ${new Date(requestDate).toLocaleDateString('pt-BR')}\nPreço: R$ ${selectedService.preco.toFixed(2)}`);
                fecharModal();
            } else {
                const errorData = await response.json();
                alert('Erro ao solicitar serviço: ' + (errorData.erro || 'Erro desconhecido'));
            }
        } catch (error) {
            console.error('Erro ao solicitar serviço:', error);
            alert('Erro ao solicitar serviço. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Header */}
            <div className="w-full bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50 shadow-2xl">
                <div className="flex justify-between items-center px-8 py-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-wide">Solicitar Serviços</h1>
                        <p className="text-gray-300 font-medium">Encontre o profissional ideal</p>
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
                {/* Search Bar */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-900/50 border border-gray-700/50 ring-1 ring-gray-600/20 p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Input */}
                            <div className="flex items-center space-x-4 flex-1">
                                <span className="text-2xl">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Buscar serviços, categorias ou prestadores..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400/50 focus:outline-none focus:ring-2 transition-all duration-300"
                                />
                            </div>
                            {/* Category Filter */}
                            <div className="flex items-center space-x-2">
                                <span className="text-lg">🏷️</span>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-2xl text-white focus:border-gray-400 focus:ring-gray-400/50 focus:outline-none focus:ring-2 transition-all duration-300"
                                >
                                    {categorias.map(categoria => (
                                        <option key={categoria} value={categoria} className="bg-gray-900">
                                            {categoria}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-400 mx-auto mb-4">
                            </div>
                            <p className="text-xl text-gray-300 font-medium">Carregando serviços disponíveis...</p>
                        </div>
                    ) : filteredServicos.length > 0 ? (
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-wide mb-8">Serviços Disponíveis ({filteredServicos.length})</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredServicos.map((servico) => (
                                    <div key={servico.id} className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-900/50 border border-gray-700/50 ring-1 ring-gray-600/20 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-gray-500/25">
                                        <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-4">
                                            <h3 className="font-semibold tracking-wide">{servico.categoria}</h3>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-xl font-bold text-white mb-3 tracking-wide">{servico.nome}</h4>
                                            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                                                {servico.descricao}
                                            </p>
                                            <p className="text-gray-300 mb-6 flex items-center">
                                                <span className="text-lg mr-2">👤</span>
                                                <span className="font-medium">{servico.prestador}</span>
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <div className="text-2xl font-bold text-green-400">
                                                    R$ {servico.preco.toFixed(2)}
                                                </div>
                                                <button 
                                                    className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl font-semibold text-sm"
                                                    onClick={() => abrirModalSolicitacao(servico)}
                                                >
                                                    💼 Solicitar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-900/50 border border-gray-700/50 ring-1 ring-gray-600/20 p-12 max-w-md mx-auto">
                                <div className="text-8xl mb-8">🔍</div>
                                <h3 className="text-white text-3xl font-bold mb-4 tracking-wide">Nenhum serviço encontrado</h3>
                                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                    Não encontramos serviços que correspondam à sua busca.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('Todas');
                                    }}
                                    className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
                                >
                                    Ver Todos os Serviços
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Solicitação */}
            {showModal && selectedService && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-700">
                        {/* Header do Modal */}
                        <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-4 rounded-t-2xl">
                            <h3 className="text-xl font-bold tracking-wide">Solicitar Serviço</h3>
                        </div>

                        {/* Conteúdo do Modal */}
                        <div className="p-6">
                            {/* Informações do Serviço */}
                            <div className="bg-gray-900/50 rounded-2xl p-4 mb-6 border border-gray-600">
                                <h4 className="text-lg font-semibold text-white mb-2">{selectedService.nome}</h4>
                                <p className="text-gray-300 text-sm mb-3">{selectedService.descricao}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Prestador: <span className="text-white font-medium">{selectedService.prestador}</span></span>
                                    <span className="text-green-400 font-bold text-lg">R$ {selectedService.preco.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Formulário */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 font-medium mb-2">Data Desejada *</label>
                                    <input
                                        type="date"
                                        value={requestDate}
                                        onChange={(e) => setRequestDate(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-2xl text-white focus:border-gray-400 focus:ring-gray-400/50 focus:outline-none focus:ring-2 transition-all duration-300"
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 font-medium mb-2">Mensagem (Opcional)</label>
                                    <textarea
                                        value={requestMessage}
                                        onChange={(e) => setRequestMessage(e.target.value)}
                                        placeholder="Descreva detalhes específicos ou instruções para o prestador..."
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400/50 focus:outline-none focus:ring-2 transition-all duration-300 resize-vertical"
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Botões */}
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={fecharModal}
                                    className="flex-1 border border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white px-4 py-3 rounded-2xl transition-all duration-300 font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={solicitarServico}
                                    className="flex-1 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl font-semibold"
                                >
                                    📋 Confirmar Solicitação
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}