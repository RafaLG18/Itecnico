import { useNavigate } from 'react-router-dom';
export default function HomeCliente(){
    const navigate = useNavigate();
    return (<h2 className="text-primary mb-4">Tela home cliente</h2>);
}
