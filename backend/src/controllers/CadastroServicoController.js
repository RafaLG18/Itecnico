import repositorioGeral from "../model/repositories/repositorioGeral.js";
import Servico from '../model/entities/Servico.js';
const repo = new repositorioGeral();

const CadastroServicoController = {
  cadastrarServico: async (req, res) => {
    const { id_usuario, nome, descricao, preco } = req.body;
  
    var servico = new Servico();
    
    servico.id_usuario=id_usuario;
    servico.nome=nome;
    servico.descricao=descricao;
    servico.preco=preco;


    // Simulação de lógica — aqui você chamaria o repository, validaria etc.
    if (!id_usuario ||!nome || !descricao || !preco) {
      return res
        .status(400)
        .json({ erro: "Todos os campos são obrigatórios." });
    }

    // Lógica de criação fictícia
    
    await repo.addServico(servico);
    console.log("Servicos cadastrados");
    console.log("Servico cadastrado:", { id_usuario, nome,descricao,preco });
    return res
      .status(201)
      .json({ mensagem: "Usuário cadastrado com sucesso.",servico:nome });
  },
};

export default CadastroServicoController;
