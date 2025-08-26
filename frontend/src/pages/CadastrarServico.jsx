import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroServico() {
    const navigate = useNavigate();
    const [servicosGerais, setServicosGerais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        id_servico_geral: '',
        nome: '',
        descricao: '',
        preco: ''
    });
    const [idPrestador, setIdPrestador] = useState(null);

    useEffect(() => {
        carregarServicosGerais();
        obterIdPrestador();
    }, []);

    const carregarServicosGerais = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/cadastro-servico-geral');
            const data = await response.json();
            if (data.servicos) {
                setServicosGerais(data.servicos);
            }
        } catch (error) {
            console.error('Erro ao carregar serviços gerais:', error);
        } finally {
            setLoading(false);
        }
    };

    const obterIdPrestador = () => {
        // Aqui você obteria o ID do prestador logado
        // Por exemplo, do localStorage, context, ou sessão
        const prestadorLogado = localStorage.getItem('prestadorId') || sessionStorage.getItem('prestadorId');
        if (prestadorLogado) {
            setIdPrestador(prestadorLogado);
        } else {
            // ID temporário para demonstração - substituir pela lógica real
            setIdPrestador(1);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!idPrestador || !formData.id_servico_geral || !formData.nome || !formData.descricao || !formData.preco) {
            alert('Todos os campos são obrigatórios!');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/cadastro-servico-prestado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_prestador: idPrestador,
                    ...formData,
                    preco: parseFloat(formData.preco)
                }),
            });

            if (response.ok) {
                alert('Serviço cadastrado com sucesso!');
                setFormData({
                    id_servico_geral: '',
                    nome: '',
                    descricao: '',
                    preco: ''
                });
            } else {
                const errorData = await response.json();
                alert('Erro ao cadastrar serviço: ' + (errorData.erro || 'Erro desconhecido'));
            }
        } catch (error) {
            console.error('Erro ao cadastrar serviço:', error);
            alert('Erro ao cadastrar serviço. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="h-full">
                {/* Header */}
                <div className="w-full bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50 shadow-2xl">
                    <div className="flex justify-between items-center px-8 py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-wide">Cadastrar Novo Serviço</h1>
                            <p className="text-gray-300 font-medium">Crie um novo serviço para oferecer</p>
                        </div>
                        <button 
                            className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 font-medium shadow-lg"
                            onClick={() => navigate('/homePrestador')}
                        >
                            ← Voltar
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full p-8">
                    <div className="flex justify-center">
                        <div className="w-full max-w-2xl">
                            <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-900/50 border border-gray-700/50 ring-1 ring-gray-600/20">
                                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-6 rounded-t-2xl">
                                    <h2 className="text-2xl font-bold tracking-wide">
                                        🎯 Dados do Serviço
                                    </h2>
                                </div>
                                <div className="p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Informações do Prestador */}
                                        <div>
                                            <div className="bg-gray-900/50 border border-gray-600 text-white px-6 py-4 rounded-2xl flex items-center">
                                                <span className="text-2xl mr-3">👤</span>
                                                <div>
                                                    <strong className="font-semibold">Prestador:</strong> <span className="text-gray-300">ID #{idPrestador || 'Carregando...'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="id_servico_geral" className="block text-gray-300 font-medium tracking-wide mb-3">
                                                Categoria do Serviço *
                                            </label>
                                            <select
                                                className="w-full px-4 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white focus:border-gray-400 focus:ring-gray-400/50 focus:outline-none focus:ring-2 transition-all duration-300"
                                                id="id_servico_geral"
                                                name="id_servico_geral"
                                                value={formData.id_servico_geral}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="" className="bg-gray-800">Selecione uma categoria</option>
                                                {loading ? (
                                                    <option disabled className="bg-gray-800">Carregando...</option>
                                                ) : (
                                                    servicosGerais.map(servico => (
                                                        <option key={servico.id} value={servico.id} className="bg-gray-800">
                                                            {servico.nome}
                                                        </option>
                                                    ))
                                                )}
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="nome" className="block text-gray-300 font-medium tracking-wide mb-3">
                                                Nome do Serviço *
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400/50 focus:outline-none focus:ring-2 transition-all duration-300"
                                                id="nome"
                                                name="nome"
                                                value={formData.nome}
                                                onChange={handleInputChange}
                                                placeholder="Ex: Conserto de Computador Doméstico"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="descricao" className="block text-gray-300 font-medium tracking-wide mb-3">
                                                Descrição do Serviço *
                                            </label>
                                            <textarea
                                                className="w-full px-4 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400/50 focus:outline-none focus:ring-2 transition-all duration-300 resize-vertical"
                                                id="descricao"
                                                name="descricao"
                                                value={formData.descricao}
                                                onChange={handleInputChange}
                                                rows="4"
                                                placeholder="Descreva detalhadamente o serviço que você oferece..."
                                                required
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label htmlFor="preco" className="block text-gray-300 font-medium tracking-wide mb-3">
                                                Preço (R$) *
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                className="w-full px-4 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400/50 focus:outline-none focus:ring-2 transition-all duration-300"
                                                id="preco"
                                                name="preco"
                                                value={formData.preco}
                                                onChange={handleInputChange}
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                            <button 
                                                type="button" 
                                                className="flex-1 border border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white px-6 py-3 rounded-2xl transition-all duration-300 backdrop-blur-sm font-medium"
                                                onClick={() => navigate('/homePrestador')}
                                            >
                                                Cancelar
                                            </button>
                                            <button 
                                                type="submit" 
                                                className="flex-1 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-gray-500/25 shadow-xl font-semibold"
                                            >
                                                💾 Cadastrar Serviço
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}