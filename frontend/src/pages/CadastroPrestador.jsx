import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroPrestador(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        senha: '',
        tipo: 'prestador'
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
        if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
        if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Aqui você enviaria os dados para o backend
        console.log('Dados do prestador:', formData);
        try {
            const response = await fetch("http://127.0.0.1:3001/api/cadastro-usuario", {
                method: "POST",
                // Data will be serialized and sent as json
                body: JSON.stringify(formData),
                // tell the server we're sending JSON
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error){
            console.error(error)
        }
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h2 className="text-center mb-0">Cadastro de Prestador</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome Completo</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                                        id="nome"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                    />
                                    {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="cpf" className="form-label">CPF</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}
                                        id="cpf"
                                        name="cpf"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                    />
                                    {errors.cpf && <div className="invalid-feedback">{errors.cpf}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="senha" className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.senha ? 'is-invalid' : ''}`}
                                        id="senha"
                                        name="senha"
                                        value={formData.senha}
                                        onChange={handleChange}
                                    />
                                    {errors.senha && <div className="invalid-feedback">{errors.senha}</div>}
                                </div>

                               <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Cadastrar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate('/')}
                                    >
                                        Voltar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}