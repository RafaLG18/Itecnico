// import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cadastro from './pages/TelaCadastro';
import CadastroCliente from './pages/CadastroCliente';
import CadastroPrestador from './pages/CadastroPrestador';
import Login from './pages/Login';
import CadastroServico from './pages/CadastrarServico';
import SolicitaServico from './pages/SolicitaServicos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastroCliente" element={<CadastroCliente />} />
        <Route path="/cadastroCliente/solicitaServico" element={<SolicitaServico />} />
        <Route path="/cadastroPrestador" element={<CadastroPrestador />} />
        <Route path="/cadastroPrestador/cadastroServico" element={<CadastroServico />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
