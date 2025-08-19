import ConnectionManager from "./ConnectionManager.js";

class ServicoPrestadoRepository {
  constructor() {
    this.conn = new ConnectionManager();
  }
  async setServicoPrestado(servicoPrestado) {
    let client;
    const query = `
      INSERT INTO servico_prestado (id_prestador, id_servico_geral, nome, descricao, preco)
      VALUES($1, $2, $3, $4 ,$5)
    `;

    const values = [
      servicoPrestado.id_prestador,
      servicoPrestado.id_servico_geral,
      servicoPrestado.nome,
      servicoPrestado.descricao,
      servicoPrestado.preco,
    ];
    console.log(values);
    try {
      client = await this.conn.getClient();
      await client.query(query, values);
    } catch (err) {
      console.error("Erro ao inserir servico:", err);
      throw err;
    } finally {
      if (client) {
        client.release();
      }
    }
  }
  async getServicosPrestado() {
    let client;
    const query = `SELECT * FROM servico_prestado`;

    try {
      client = await this.conn.getClient();
      const result = await client.query(query);
      return result.rows;
    } catch (err) {
      console.error("Erro ao buscar servicos", err);
      throw err;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async getServicoPrestadoById(id) {
    let client;
    const query = `SELECT * FROM servico_prestado WHERE id = $1`;

    try {
      client = await this.conn.getClient();
      const result = await client.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      console.error("Erro ao buscar servico por ID:", err);
      throw err;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async updateServicoPrestado(id, servicoPrestado) {
    let client;
    const query = `
      UPDATE servico_prestado 
      SET id_prestador = $1, id_servico_geral = $2, nome = $3, descricao = $4, preco = $5
      WHERE id = $6
    `;

    const values = [
      servicoPrestado.id_prestador,
      servicoPrestado.id_servico_geral,
      servicoPrestado.nome,
      servicoPrestado.descricao,
      servicoPrestado.preco,
      id
    ];

    try {
      client = await this.conn.getClient();
      const result = await client.query(query, values);
      return result.rowCount > 0;
    } catch (err) {
      console.error("Erro ao atualizar servico:", err);
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

export default ServicoPrestadoRepository;
