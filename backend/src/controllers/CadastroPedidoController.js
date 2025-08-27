import repositorioGeral from "../model/repositories/repositorioGeral.js";
import Pedido from '../model/entities/Pedido.js';
const repo = new repositorioGeral();

const CadastroPedidoController = {
  cadastrarPedido: async (req, res) => {
    const { id_usuario_cliente, id_usuario_prestador, id_servico_prestado, data, preco } = req.body;
  
    var pedido = new Pedido();
    
    pedido.id_usuario_cliente=id_usuario_cliente;
    pedido.id_usuario_prestador=id_usuario_prestador;
    pedido.id_servico_prestado=id_servico_prestado;
    pedido.data=data;
    pedido.preco=preco || 0;

    // Simulação de lógica — aqui você chamaria o repository, validaria etc.
    if (!id_usuario_cliente || !id_usuario_prestador || !id_servico_prestado || !data) {
      return res
        .status(400)
        .json({ erro: "Todos os campos são obrigatórios." });
    }

    // Lógica de criação fictícia
    
    await repo.addPedido(pedido);
    console.log("Pedido cadastrados");
    console.log("Pedido cadastrado:", { id_usuario_cliente, id_usuario_prestador, id_servico_prestado, data });
    return res
      .status(201)
      .json({ mensagem: "Pedido cadastrado com sucesso." });
  },

  getPedidosByPrestador: async (req, res) => {
    try {
      const { id_prestador } = req.params;
      
      if (!id_prestador) {
        return res.status(400).json({
          erro: "ID do prestador é obrigatório"
        });
      }

      const pedidos = await repo.getPedidosByPrestador(id_prestador);

      if (pedidos.length > 0) {
        return res.status(200).json({
          mensagem: "Pedidos encontrados",
          pedidos: pedidos
        });
      } else {
        return res.status(200).json({
          mensagem: "Nenhum pedido encontrado",
          pedidos: []
        });
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      return res.status(500).json({
        erro: "Erro interno do servidor"
      });
    }
  },

  getPedidosByCliente: async (req, res) => {
    try {
      const { id_cliente } = req.params;
      
      if (!id_cliente) {
        return res.status(400).json({
          erro: "ID do cliente é obrigatório"
        });
      }

      const pedidos = await repo.getPedidosByCliente(id_cliente);

      if (pedidos.length > 0) {
        return res.status(200).json({
          mensagem: "Pedidos encontrados",
          pedidos: pedidos
        });
      } else {
        return res.status(200).json({
          mensagem: "Nenhum pedido encontrado",
          pedidos: []
        });
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos do cliente:", error);
      return res.status(500).json({
        erro: "Erro interno do servidor"
      });
    }
  },

  cancelarPedido: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          erro: "ID do pedido é obrigatório"
        });
      }

      const cancelado = await repo.deletePedido(id);

      if (cancelado) {
        return res.status(200).json({
          mensagem: "Pedido cancelado com sucesso"
        });
      } else {
        return res.status(404).json({
          erro: "Pedido não encontrado"
        });
      }
    } catch (error) {
      console.error("Erro ao cancelar pedido:", error);
      return res.status(500).json({
        erro: "Erro interno do servidor"
      });
    }
  },

  atualizarStatusPedido: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!id) {
        return res.status(400).json({
          erro: "ID do pedido é obrigatório"
        });
      }

      if (!status) {
        return res.status(400).json({
          erro: "Status é obrigatório"
        });
      }

      const statusValidos = ['Pendente', 'Aceito', 'Recusado', 'Concluído'];
      if (!statusValidos.includes(status)) {
        return res.status(400).json({
          erro: "Status inválido. Status válidos: " + statusValidos.join(', ')
        });
      }

      const atualizado = await repo.updatePedidoStatus(id, status);

      if (atualizado) {
        return res.status(200).json({
          mensagem: `Status do pedido atualizado para '${status}' com sucesso`
        });
      } else {
        return res.status(404).json({
          erro: "Pedido não encontrado"
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
      return res.status(500).json({
        erro: "Erro interno do servidor"
      });
    }
  },
};

export default CadastroPedidoController;
