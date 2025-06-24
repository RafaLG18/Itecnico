import repositorioGeral from "../model/repositories/repositorioGeral.js";
import Usuario from '../model/entities/Usuario.js';
const repo = new repositorioGeral();

const CadastroController = {
  cadastrarUsuario: (req, res) => {
    const { nome, cpf, senha, tipo } = req.body;
  
    var usuario = new Usuario();
    usuario.setNome(nome);
    usuario.setCpf(cpf);
    usuario.setSenha(senha);
    usuario.setTipo(tipo);

    // Simulação de lógica — aqui você chamaria o repository, validaria etc.
    if (!nome || !senha || !cpf || !tipo) {
      return res
        .status(400)
        .json({ erro: "Todos os campos são obrigatórios." });
    }

    // Lógica de criação fictícia
    
    repo.addUser(usuario);
    console.log("Usuarios cadastrados");
    console.log("Usuário cadastrado:", { nome, cpf, tipo });
    return res
      .status(201)
      .json({ mensagem: "Usuário cadastrado com sucesso.",usuario:nome });
  },
};

export default CadastroController;
