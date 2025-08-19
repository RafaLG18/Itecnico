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
  getServicosPrestado: async (req, res) => {
    try {
      const servicos = await repo.getServicosPrestados();

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
  },

  getServicoPrestadoById: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          erro: "ID do serviço é obrigatório"
        });
      }

      const servico = await repo.getServicoPrestadoById(id);

      if (servico) {
        return res.status(200).json({
          mensagem: "Serviço encontrado",
          servico: servico
        });
      } else {
        return res.status(404).json({
          erro: "Serviço não encontrado"
        });
      }
    } catch (error) {
      console.error("Erro ao buscar serviço por ID:", error);
      return res.status(500).json({
        erro: "Erro interno do servidor"
      });
    }
  },

  atualizarServicoPrestado: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_prestador, id_servico_geral, nome, descricao, preco } = req.body;

      if (!id) {
        return res.status(400).json({
          erro: "ID do serviço é obrigatório"
        });
      }

      if (!id_prestador || !id_servico_geral || !nome || !descricao || !preco) {
        return res.status(400).json({
          erro: "Todos os campos são obrigatórios"
        });
      }

      const servicoPrestado = new ServicoPrestado();
      servicoPrestado.id_prestador = id_prestador;
      servicoPrestado.id_servico_geral = id_servico_geral;
      servicoPrestado.nome = nome;
      servicoPrestado.descricao = descricao;
      servicoPrestado.preco = preco;

      const updated = await repo.updateServicoPrestado(id, servicoPrestado);

      if (updated) {
        return res.status(200).json({
          mensagem: "Serviço atualizado com sucesso",
          servico: { id, nome, descricao, preco }
        });
      } else {
        return res.status(404).json({
          erro: "Serviço não encontrado"
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error);
      return res.status(500).json({
        erro: "Erro interno do servidor"
      });
    }
  }
};

export default CadastroServicoPrestadoController;
