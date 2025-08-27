import ConnectionManager from "./ConnectionManager.js";
class PedidoRepository{
    constructor(){
        this.conn = new ConnectionManager();
    }

  async setPedido(pedido) {
    let client
    const query = `
      INSERT INTO pedido (id_usuario_cliente, id_usuario_prestador, id_servico_prestado, data, preco, status)
      VALUES($1, $2, $3, $4, $5, $6)
    `;
    
    const values = [
      pedido.id_usuario_cliente,
      pedido.id_usuario_prestador,
      pedido.id_servico_prestado,
      pedido.data,
      pedido.preco || 0,
      pedido.status || 'Pendente'
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
  async getPedidosByPrestador(id_prestador) {
    let client;
    const query = `
      SELECT 
        p.id,
        p.id_usuario_cliente,
        p.id_usuario_prestador,
        p.id_servico_prestado,
        p.data,
        p.preco,
        p.status,
        u.nome as cliente_nome,
        sp.nome as servico_nome,
        sp.descricao as servico_descricao
      FROM pedido p
      JOIN usuario u ON p.id_usuario_cliente = u.id
      JOIN servico_prestado sp ON p.id_servico_prestado = sp.id
      WHERE p.id_usuario_prestador = $1
      ORDER BY p.data DESC
    `;
    
    try {
      client = await this.conn.getClient();
      const result = await client.query(query, [id_prestador]);
      return result.rows;
    } catch (err) {
      console.error("Erro ao buscar pedidos:", err);
      throw err;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async getPedidosByCliente(id_cliente) {
    let client;
    const query = `
      SELECT 
        p.id,
        p.id_usuario_cliente,
        p.id_usuario_prestador,
        p.id_servico_prestado,
        p.data,
        p.preco,
        p.status,
        up.nome as prestador_nome,
        sp.nome as servico_nome,
        sp.descricao as servico_descricao
      FROM pedido p
      JOIN usuario up ON p.id_usuario_prestador = up.id
      JOIN servico_prestado sp ON p.id_servico_prestado = sp.id
      WHERE p.id_usuario_cliente = $1
      ORDER BY p.data DESC
    `;
    
    try {
      client = await this.conn.getClient();
      const result = await client.query(query, [id_cliente]);
      return result.rows;
    } catch (err) {
      console.error("Erro ao buscar pedidos do cliente:", err);
      throw err;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async deletePedido(id) {
    let client;
    const query = `DELETE FROM pedido WHERE id = $1`;
    
    try {
      client = await this.conn.getClient();
      const result = await client.query(query, [id]);
      return result.rowCount > 0;
    } catch (err) {
      console.error("Erro ao cancelar pedido:", err);
      throw err;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async updatePedidoStatus(id, status) {
    let client;
    const query = `UPDATE pedido SET status = $1 WHERE id = $2`;
    
    try {
      client = await this.conn.getClient();
      const result = await client.query(query, [status, id]);
      return result.rowCount > 0;
    } catch (err) {
      console.error("Erro ao atualizar status do pedido:", err);
      throw err;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async close() {
    await this.conn.disconnect();
  }
}
export default PedidoRepository