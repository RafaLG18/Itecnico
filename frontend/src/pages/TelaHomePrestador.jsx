import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TelaHomePrestador() {
    const navigate = useNavigate();
    const [servicosSolicitados, setServicosSolicitados] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarServicosSolicitados();
    }, []);

    const carregarServicosSolicitados = async () => {
        try {
            // Aqui você faria a requisição para buscar os serviços solicitados
            const response = await fetch('http://localhost:3001/api/pedidos-prestador');
            const data = await response.json();
            setServicosSolicitados(data);
            
            // Dados simulados para demonstração
            // setServicosSolicitados([
            //     { id: 1, cliente: 'João Silva', servico: 'Conserto de Computador', data: '2025-01-29', preco: 150 },
            //     { id: 2, cliente: 'Maria Santos', servico: 'Instalação de Software', data: '2025-01-28', preco: 80 },
            //     { id: 3, cliente: 'Pedro Costa', servico: 'Manutenção de Rede', data: '2025-01-27', preco: 200 }
            // ]);
        } catch (error) {
            console.error('Erro ao carregar serviços solicitados:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid vh-100 bg-light">
            <div className="row h-100">
                {/* Header */}
                <div className="col-12 bg-primary text-white py-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="mb-0">Painel do Prestador</h2>
                        <button 
                            className="btn btn-outline-light"
                            onClick={() => navigate('/')}
                        >
                            Sair
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="col-12 p-4">
                    <div className="row">
                        {/* Ações Rápidas */}
                        <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-header bg-success text-white">
                                    <h5 className="mb-0">Ações Rápidas</h5>
                                </div>
                                <div className="card-body d-flex flex-column justify-content-center">
                                    <button 
                                        className="btn btn-success btn-lg mb-3"
                                        onClick={() => navigate('/cadastroPrestador/cadastroServico')}
                                    >
                                        <i className="fas fa-plus me-2"></i>
                                        Cadastrar Novo Serviço
                                    </button>
                                    <button 
                                        className="btn btn-outline-success"
                                        onClick={() => navigate('/meus-servicos')}
                                    >
                                        Ver Meus Serviços
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Serviços Solicitados */}
                        <div className="col-md-8 mb-4">
                            <div className="card h-100">
                                <div className="card-header bg-info text-white">
                                    <h5 className="mb-0">Serviços Solicitados</h5>
                                </div>
                                <div className="card-body">
                                    {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Carregando...</span>
                                            </div>
                                        </div>
                                    ) : servicosSolicitados.length > 0 ? (
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Cliente</th>
                                                        <th>Serviço</th>
                                                        <th>Data</th>
                                                        <th>Valor</th>
                                                        <th>Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {servicosSolicitados.map(servico => (
                                                        <tr key={servico.id}>
                                                            <td>{servico.cliente}</td>
                                                            <td>{servico.servico}</td>
                                                            <td>{new Date(servico.data).toLocaleDateString('pt-BR')}</td>
                                                            <td>R$ {servico.preco.toFixed(2)}</td>
                                                            <td>
                                                                <button className="btn btn-sm btn-primary me-2">
                                                                    Aceitar
                                                                </button>
                                                                <button className="btn btn-sm btn-outline-secondary">
                                                                    Ver Detalhes
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center text-muted">
                                            <p>Nenhum serviço solicitado no momento.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Estatísticas */}
                    <div className="row mt-4">
                        <div className="col-md-3">
                            <div className="card text-center bg-primary text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Total de Serviços</h5>
                                    <h2 className="mb-0">{servicosSolicitados.length}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center bg-success text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Receita Pendente</h5>
                                    <h2 className="mb-0">
                                        R$ {servicosSolicitados.reduce((total, servico) => total + servico.preco, 0).toFixed(2)}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center bg-warning text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Pendentes</h5>
                                    <h2 className="mb-0">{servicosSolicitados.length}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center bg-info text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Concluídos</h5>
                                    <h2 className="mb-0">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
