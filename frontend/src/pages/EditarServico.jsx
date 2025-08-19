import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarServico() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [servicosGerais, setServicosGerais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingServico, setLoadingServico] = useState(true);
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
        carregarServico();
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

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

    const carregarServico = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/cadastro-servico-prestado/${id}`);
            const data = await response.json();
            
            if (response.ok && data.servico) {
                const servico = data.servico;
                setFormData({
                    id_servico_geral: servico.id_servico_geral || '',
                    nome: servico.nome || '',
                    descricao: servico.descricao || '',
                    preco: servico.preco || ''
                });
            } else {
                alert('Erro ao carregar serviço: ' + (data.erro || 'Serviço não encontrado'));
                navigate('/meus-servicos');
            }
        } catch (error) {
            console.error('Erro ao carregar serviço:', error);
            alert('Erro ao carregar serviço. Tente novamente.');
            navigate('/meus-servicos');
        } finally {
            setLoadingServico(false);
        }
    };

    const obterIdPrestador = () => {
        const prestadorLogado = localStorage.getItem('prestadorId') || sessionStorage.getItem('prestadorId');
        if (prestadorLogado) {
            setIdPrestador(prestadorLogado);
        } else {
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
            const response = await fetch(`http://localhost:3001/api/cadastro-servico-prestado/${id}`, {
                method: 'PUT',
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
                alert('Serviço atualizado com sucesso!');
                navigate('/meus-servicos');
            } else {
                const errorData = await response.json();
                alert('Erro ao atualizar serviço: ' + (errorData.erro || 'Erro desconhecido'));
            }
        } catch (error) {
            console.error('Erro ao atualizar serviço:', error);
            alert('Erro ao atualizar serviço. Tente novamente.');
        }
    };

    if (loadingServico) {
        return (
            <div className="container-fluid vh-100 bg-light d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                    <p className="mt-2">Carregando dados do serviço...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid vh-100 bg-light">
            <div className="row h-100">
                {/* Header */}
                <div className="col-12 bg-primary text-white py-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="mb-0">Editar Serviço</h2>
                        <button 
                            className="btn btn-outline-light"
                            onClick={() => navigate('/meus-servicos')}
                        >
                            <i className="fas fa-arrow-left me-2"></i>
                            Voltar
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="col-12 p-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            <div className="card shadow">
                                <div className="card-header bg-warning text-white">
                                    <h5 className="mb-0">
                                        <i className="fas fa-edit me-2"></i>
                                        Editar Dados do Serviço
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        {/* Informações do Prestador */}
                                        <div className="mb-3">
                                            <div className="alert alert-info d-flex align-items-center">
                                                <i className="fas fa-user-circle me-2"></i>
                                                <div>
                                                    <strong>Prestador:</strong> ID #{idPrestador || 'Carregando...'}
                                                    <br />
                                                    <small>Editando serviço ID #{id}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="id_servico_geral" className="form-label">
                                                    Categoria do Serviço *
                                                </label>
                                                <select
                                                    className="form-select"
                                                    id="id_servico_geral"
                                                    name="id_servico_geral"
                                                    value={formData.id_servico_geral}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Selecione uma categoria</option>
                                                    {loading ? (
                                                        <option disabled>Carregando...</option>
                                                    ) : (
                                                        servicosGerais.map(servico => (
                                                            <option key={servico.id} value={servico.id}>
                                                                {servico.nome}
                                                            </option>
                                                        ))
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="nome" className="form-label">
                                                Nome do Serviço *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nome"
                                                name="nome"
                                                value={formData.nome}
                                                onChange={handleInputChange}
                                                placeholder="Ex: Conserto de Computador Doméstico"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="descricao" className="form-label">
                                                Descrição do Serviço *
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="descricao"
                                                name="descricao"
                                                value={formData.descricao}
                                                onChange={handleInputChange}
                                                rows="4"
                                                placeholder="Descreva detalhadamente o serviço que você oferece..."
                                                required
                                            ></textarea>
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="preco" className="form-label">
                                                Preço (R$) *
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                className="form-control"
                                                id="preco"
                                                name="preco"
                                                value={formData.preco}
                                                onChange={handleInputChange}
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-secondary me-md-2"
                                                onClick={() => navigate('/meus-servicos')}
                                            >
                                                Cancelar
                                            </button>
                                            <button type="submit" className="btn btn-warning">
                                                <i className="fas fa-save me-2"></i>
                                                Atualizar Serviço
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