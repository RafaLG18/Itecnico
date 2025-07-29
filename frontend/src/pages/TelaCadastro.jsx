import { useNavigate } from 'react-router-dom';
export default function Cadastro() {
    const navigate = useNavigate();
    return (
        <div className="d-flex vh-100 bg-light">
            <div className="m-auto text-center">
                <h2 className="text-primary mb-4">Cadastro</h2>
                <div className="d-grid gap-3" style={{ maxWidth: '300px' }}>
                    <button
                        className="btn btn-primary py-3"
                        onClick={() => navigate('/CadastroCliente')}
                    >
                        Cadastro de Cliente
                    </button>
                    <button
                        className="btn btn-outline-primary py-3"
                        onClick={() => navigate('/CadastroPrestador')}
                    >
                        Cadastro de Prestador
                    </button>
                </div>
            </div>
        </div>
    );
}