import repositorioGeral from "../model/repositories/repositorioGeral.js";
import Pedido from '../model/entities/Pedido.js';
const repo = new repositorioGeral();

const CadastroPedidoController = {
  cadastrarPedido: async (req, res) => {
    const { id_usuario_cliente, id_usuario_servidor, id_servico, data } = req.body;
  
    var pedido = new Pedido();
    
    pedido.id_usuario_cliente=id_usuario_cliente;
    pedido.id_usuario_servidor=id_usuario_servidor;
    pedido.id_servico=id_servico;
    pedido.data=data;

    // Simulação de lógica — aqui você chamaria o repository, validaria etc.
    if (!id_usuario_cliente ||!id_usuario_servidor || !id_servico || !data) {
      return res
        .status(400)
        .json({ erro: "Todos os campos são obrigatórios." });
    }

    // Lógica de criação fictícia
    
    await repo.addPedido(pedido);
    console.log("Pedido cadastrados");
    console.log("Pedido cadastrado:", { id_usuario_cliente, id_usuario_servidor, id_servico, data });
    return res
      .status(201)
      .json({ mensagem: "Pedido cadastrado com sucesso." });
  },
};

export default CadastroPedidoController;
