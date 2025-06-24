import ConnectionManager from "./ConnectionManager.js";
class PedidoRepository{
    constructor(){
        this.conn = new ConnectionManager();
        this.client = null;
    }

    async init() {
    await this.conn.connect(); // Estabelece a conexão
    this.client = this.conn.getClient();
  }

  async setPedido(pedido) {

    const query = `
      INSERT INTO pedido (id, id_usuario_cliente, id_usuario_servidor, id_servico, data)
      VALUES($1, $2, $3, $4, $5)
    `;
    
    const values = [
      pedido.id,
      pedido.id_usuario_cliente,
      pedido.id_usuario_servidor,
      pedido.id_servico,
      pedido.data
    ];
    console.log(values)
    try {
      await this.init();
      await this.client.query(query, values);
      await this.close();
      
    } catch (err) {
      console.error("Erro ao inserir servico:", err);
      throw err;
    }
  }

  async close() {
    await this.conn.disconnect();
  }
}
export default PedidoRepository