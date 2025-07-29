import repositorioGeral from "../model/repositories/repositorioGeral.js";
import ServicoPrestado from "../model/entities/ServicoPrestado.js";
const repo = new repositorioGeral();

const CadastroServicoPrestadoController = {
  cadastrarServicoPrestado: async (req, res) => {
    const { id_prestador, id_servico_geral, nome, descricao, preco } = req.body;

    var servicoPrestado = new ServicoPrestado();

    servicoPrestado.id_prestador = id_prestador;
    servicoPrestado.id_servico_geral = id_servico_geral;
    servicoPrestado.nome = nome;
    servicoPrestado.descricao = descricao;
    servicoPrestado.preco = preco;

    // Simulação de lógica — aqui você chamaria o repository, validaria etc.
    if (!id_prestador || !id_servico_geral || !nome || !descricao || !preco) {
      return res
        .status(400)
        .json({ erro: "Todos os campos são obrigatórios." });
    }

    // Lógica de criação fictícia

    await repo.addServicoPrestado(servicoPrestado);
    console.log("Servicos cadastrados");
    console.log("Servico cadastrado:", { nome, descricao });
    return res.status(201).json({
      mensagem: "Servico Prestado cadastrado com sucesso.",
      servicoPrestado: nome,
    });
  },
};

export default CadastroServicoPrestadoController;
