import repositorioGeral from "../model/repositories/repositorioGeral.js";
import ServicoGeral from "../model/entities/ServicoGeral.js";
const repo = new repositorioGeral();

const CadastroServicoGeralController = {
  cadastrarServicoGeral: async (req, res) => {
    const { nome, descricao } = req.body;

    var servicoGeral = new ServicoGeral();

    servicoGeral.nome = nome;
    servicoGeral.descricao = descricao;

    // Simulação de lógica — aqui você chamaria o repository, validaria etc.
    if (!id_usuario || !nome || !descricao) {
      return res
        .status(400)
        .json({ erro: "Todos os campos são obrigatórios." });
    }

    // Lógica de criação fictícia

    await repo.addServico(servicoGeral);
    console.log("Servicos cadastrados");
    console.log("Servico cadastrado:", { nome, descricao });
    return res.status(201).json({
      mensagem: "Servico geral cadastrado com sucesso.",
      servicoGeral: nome,
    });
  },
};

export default CadastroServicoGeralController;
