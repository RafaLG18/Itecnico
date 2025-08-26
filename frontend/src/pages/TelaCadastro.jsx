import { useNavigate } from 'react-router-dom';
export default function Cadastro() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
            <div className="text-center max-w-lg w-full">
                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-white tracking-wide mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Criar Conta
                    </h1>
                    <p className="text-xl text-gray-300 font-medium">Escolha o tipo de cadastro</p>
                </div>
                
                <div className="space-y-6 w-full">
                    <button
                        className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white py-8 px-8 rounded-2xl text-xl font-semibold transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-gray-500/25 shadow-2xl shadow-gray-900/50 backdrop-blur-sm ring-1 ring-gray-600/20"
                        onClick={() => navigate('/CadastroCliente')}
                    >
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-2xl tracking-wide">Cliente</span>
                            <span className="text-sm text-gray-300 font-normal">Solicitar serviços</span>
                        </div>
                    </button>
                    
                    <button
                        className="w-full bg-gray-800/80 backdrop-blur-md border border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-gray-500 py-8 px-8 rounded-2xl text-xl font-semibold transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-gray-500/25 shadow-xl"
                        onClick={() => navigate('/CadastroPrestador')}
                    >
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-2xl tracking-wide">Prestador</span>
                            <span className="text-sm text-gray-400 font-normal">Oferecer serviços</span>
                        </div>
                    </button>
                </div>

                <div className="mt-8">
                    <button
                        className="text-gray-400 hover:text-white font-medium py-3 px-6 rounded-xl transition-all duration-300"
                        onClick={() => navigate('/')}
                    >
                        ← Voltar ao início
                    </button>
                </div>
            </div>
        </div>
    );
}