import ConnectionManager from "./ConnectionManager.js";
class PedidoRepository{
    constructor(){
        this.conn = new ConnectionManager();
    }

  async setPedido(pedido) {
    let client
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

      client = await this.conn.getClient();
      await client.query(query, values);  
    } catch (err) {
      console.error("Erro ao inserir servico:", err);
      throw err;
    } finally {
      if(client){
        client.release()
      }
    }
  }
  async close() {
    await this.conn.disconnect();
  }
}
export default PedidoRepository