import { useNavigate } from 'react-router-dom';
export default function Home() {
    const navigate = useNavigate();
  return (
    <div className="d-flex vh-100 bg-light">
      <div className="m-auto text-center">
        <h2 className="text-primary mb-4">Página Inicial</h2>
        <div className="d-grid gap-3" style={{ maxWidth: '300px' }}>
          <button 
            className="btn btn-primary py-3"
            onClick={() => navigate('/Login')}
          >
            Login
          </button>
          <button 
            className="btn btn-outline-primary py-3"
            onClick={() => navigate('/Cadastro')}
          >
            Cadastro
          </button>
        </div>
      </div>
    </div>
  );
}