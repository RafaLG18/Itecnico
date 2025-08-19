import ConnectionManager from "./ConnectionManager.js";
class ServicoGeralRepository {
  constructor() {
    this.conn = new ConnectionManager();
  }

  async setServicoGeral(servicoGeral) {
    let client;
    const query = `
      INSERT INTO servico_geral (nome, descricao)
      VALUES($1, $2)
    `;

    const values = [servicoGeral.nome, servicoGeral.descricao];
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

  async getServicoGeral(){
    let client;
    const query = `
      SELECT * FROM servico_geral`;
    try {
      client = await this.conn.getClient();
      const result = await client.query(query);
      return result.rows;
    } catch (err) {
      console.error("Erro ao buscar servicos gerais", err);
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
export default ServicoGeralRepository;
