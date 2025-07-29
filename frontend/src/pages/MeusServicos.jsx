import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
            // const response = await fetch('http://localhost:3001/api/meus-servicos-prestados');
            // const data = await response.json();
            // setMeusServicos(data);
            
            // Dados simulados para demonstração
            // Para testar sem serviços, comente as linhas abaixo
            setMeusServicos([
                { 
                    id: 1, 
                    nome: 'Conserto de Computador', 
                    descricao: 'Reparo e manutenção de computadores desktop e notebook',
                    preco: 150,
                    categoria: 'Informática',
                    ativo: true
                },
                { 
                    id: 2, 
                    nome: 'Instalação de Software', 
                    descricao: 'Instalação e configuração de programas e sistemas operacionais',
                    preco: 80,
                    categoria: 'Informática',
                    ativo: true
                },
                { 
                    id: 3, 
                    nome: 'Manutenção de Rede', 
                    descricao: 'Configuração e reparo de redes domésticas e empresariais',
                    preco: 200,
                    categoria: 'Redes',
                    ativo: false
                }
            ]);
        } catch (error) {
            console.error('Erro ao carregar meus serviços:', error);
        } finally {
            setLoading(false);
        }
    };

    const editarServico = (id) => {
        // Navegar para tela de edição
        navigate(`/editar-servico/${id}`);
    };

    const toggleStatus = (id) => {
        setMeusServicos(prevServicos => 
            prevServicos.map(servico => 
                servico.id === id 
                    ? { ...servico, ativo: !servico.ativo }
                    : servico
            )
        );
    };

    const excluirServico = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
            setMeusServicos(prevServicos => 
                prevServicos.filter(servico => servico.id !== id)
            );
        }
    };

    return (
        <div className="container-fluid vh-100 bg-light">
            <div className="row h-100">
                {/* Header */}
                <div className="col-12 bg-primary text-white py-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="mb-0">Meus Serviços</h2>
                        <div>
                            <button 
                                className="btn btn-success me-2"
                                onClick={() => navigate('/cadastroPrestador/cadastroServico')}
                            >
                                <i className="fas fa-plus me-2"></i>
                                Novo Serviço
                            </button>
                            <button 
                                className="btn btn-outline-light"
                                onClick={() => navigate('/homePrestador')}
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="col-12 p-4">
                    {loading ? (
                        <div className="text-center mt-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                            <p className="mt-2">Carregando seus serviços...</p>
                        </div>
                    ) : meusServicos.length > 0 ? (
                        <div>
                            {/* Estatísticas */}
                            <div className="row mb-4">
                                <div className="col-md-3">
                                    <div className="card text-center bg-primary text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Total</h5>
                                            <h2 className="mb-0">{meusServicos.length}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card text-center bg-success text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Ativos</h5>
                                            <h2 className="mb-0">{meusServicos.filter(s => s.ativo).length}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card text-center bg-warning text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Inativos</h5>
                                            <h2 className="mb-0">{meusServicos.filter(s => !s.ativo).length}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card text-center bg-info text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Preço Médio</h5>
                                            <h2 className="mb-0">
                                                R$ {(meusServicos.reduce((total, s) => total + s.preco, 0) / meusServicos.length).toFixed(0)}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lista de Serviços */}
                            <div className="row">
                                {meusServicos.map(servico => (
                                    <div key={servico.id} className="col-md-6 col-lg-4 mb-4">
                                        <div className={`card h-100 ${!servico.ativo ? 'opacity-75' : ''}`}>
                                            <div className={`card-header d-flex justify-content-between align-items-center ${servico.ativo ? 'bg-success text-white' : 'bg-secondary text-white'}`}>
                                                <h6 className="mb-0">{servico.categoria}</h6>
                                                <span className={`badge ${servico.ativo ? 'bg-light text-success' : 'bg-light text-secondary'}`}>
                                                    {servico.ativo ? 'Ativo' : 'Inativo'}
                                                </span>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{servico.nome}</h5>
                                                <p className="card-text text-muted">{servico.descricao}</p>
                                                <div className="mt-auto">
                                                    <h4 className="text-primary mb-3">R$ {servico.preco.toFixed(2)}</h4>
                                                    <div className="d-grid gap-2">
                                                        <button 
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={() => editarServico(servico.id)}
                                                        >
                                                            <i className="fas fa-edit me-1"></i>
                                                            Editar
                                                        </button>
                                                        <div className="btn-group">
                                                            <button 
                                                                className={`btn btn-sm ${servico.ativo ? 'btn-warning' : 'btn-success'}`}
                                                                onClick={() => toggleStatus(servico.id)}
                                                            >
                                                                {servico.ativo ? 'Desativar' : 'Ativar'}
                                                            </button>
                                                            <button 
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => excluirServico(servico.id)}
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center mt-5">
                            <div className="mb-4">
                                <i className="fas fa-tools fa-5x text-muted"></i>
                            </div>
                            <h3 className="text-muted mb-3">Nenhum serviço cadastrado</h3>
                            <p className="text-muted mb-4">
                                Você ainda não cadastrou nenhum serviço. <br/>
                                Comece oferecendo seus serviços para os clientes!
                            </p>
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={() => navigate('/cadastroPrestador/cadastroServico')}
                            >
                                <i className="fas fa-plus me-2"></i>
                                Cadastrar Primeiro Serviço
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}