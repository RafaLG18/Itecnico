import { useNavigate } from 'react-router-dom';
export default function Home() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-white tracking-wide mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            iTécnico
          </h1>
          <p className="text-xl text-gray-300 font-medium">Conectando você aos melhores serviços</p>
        </div>
        
        <div className="space-y-6 w-full">
          <button 
            className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white font-semibold py-6 px-8 rounded-2xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-gray-500/25 shadow-2xl shadow-gray-900/50 backdrop-blur-sm ring-1 ring-gray-600/20"
            onClick={() => navigate('/Login')}
          >
            <span className="text-xl tracking-wide">Fazer Login</span>
          </button>
          
          <button 
            className="w-full bg-gray-800/80 backdrop-blur-md border border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-gray-500 font-semibold py-6 px-8 rounded-2xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-gray-500/25 shadow-xl"
            onClick={() => navigate('/Cadastro')}
          >
            <span className="text-xl tracking-wide">Criar Conta</span>
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 font-medium">Sua plataforma de serviços técnicos</p>
        </div>
      </div>
    </div>
  );
}