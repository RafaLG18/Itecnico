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
    if (!nome || !descricao) {
      return res
        .status(400)
        .json({ erro: "Todos os campos são obrigatórios." });
    }

    // Lógica de criação fictícia

    await repo.addServicoGeral(servicoGeral);
    console.log("Servicos cadastrados");
    console.log("Servico cadastrado:", { nome, descricao });
    return res.status(201).json({
      mensagem: "Servico geral cadastrado com sucesso.",
      servicoGeral: nome,
    });
  },
  getServicoGeral: async (req,res)=>{
    try {
      const servicos = await repo.getServicosGeral();

      if (servicos.length > 0) {
        return res.status(200).json({
          mensagem: "Serviços encontrados",
          servicos: servicos
        });
      } else {
        return res.status(200).json({
          mensagem: "Nenhum serviço encontrado",
          servicos: []
        });
      }
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      return res.status(500).json({
        erro: "Erro interno do servidor"
      });
    }
  }
};

export default CadastroServicoGeralController;
