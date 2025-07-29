import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cpf: '',
        senha: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                // Redirecionar baseado no tipo de usuário retornado pelo backend
                if (data.tipo === 'cliente') {
                    navigate('/homeCliente');
                } else if (data.tipo === 'prestador') {
                    navigate('/homePrestador');
                }
            } else {
                setErrors({ submit: 'Credenciais inválidas' });
            }
        } catch (error) {
            setErrors({ submit: 'Erro ao conectar com servidor' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
        if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
        return newErrors;
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h2 className="text-center mb-0">Login</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="cpf" className="form-label">CPF</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}
                                        id="cpf"
                                        name="cpf"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                        placeholder="000.000.000-00"
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


                                {errors.submit && (
                                    <div className="alert alert-danger" role="alert">
                                        {errors.submit}
                                    </div>
                                )}

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Login
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