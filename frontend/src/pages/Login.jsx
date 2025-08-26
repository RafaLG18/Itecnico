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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md lg:max-w-lg">
                <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl shadow-gray-900/50 border border-gray-700/50 ring-1 ring-gray-600/20 transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-gray-500/25">
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-t-2xl">
                        <h2 className="text-center text-4xl font-bold tracking-wide">Login</h2>
                        <p className="text-center text-gray-300 mt-2 font-medium">Acesse sua conta</p>
                    </div>
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="cpf" className="block text-gray-300 font-medium tracking-wide mb-3">CPF</label>
                                <input
                                    type="text"
                                    className={`w-full px-4 py-4 bg-gray-900/50 border rounded-2xl text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400/50 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.cpf ? 'border-red-500 ring-red-500/50' : 'border-gray-600'}`}
                                    id="cpf"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    placeholder="000.000.000-00"
                                />
                                {errors.cpf && <div className="text-red-400 text-sm mt-2 font-medium">{errors.cpf}</div>}
                            </div>

                            <div>
                                <label htmlFor="senha" className="block text-gray-300 font-medium tracking-wide mb-3">Senha</label>
                                <input
                                    type="password"
                                    className={`w-full px-4 py-4 bg-gray-900/50 border rounded-2xl text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400/50 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.senha ? 'border-red-500 ring-red-500/50' : 'border-gray-600'}`}
                                    id="senha"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    placeholder="Digite sua senha"
                                />
                                {errors.senha && <div className="text-red-400 text-sm mt-2 font-medium">{errors.senha}</div>}
                            </div>

                            {errors.submit && (
                                <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/50 text-red-300 px-4 py-3 rounded-2xl" role="alert">
                                    {errors.submit}
                                </div>
                            )}

                            <div className="space-y-4 pt-4">
                                <button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-gray-500/25 shadow-2xl"
                                >
                                    Entrar
                                </button>
                                <button
                                    type="button"
                                    className="w-full border border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white font-medium py-3 px-6 rounded-2xl transition-all duration-300 backdrop-blur-sm"
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
    );
}