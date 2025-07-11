class ServicoPrestadoRepository {
  constructor() {}
  async setServicoPrestado(servicoPrestado) {
    let client;
    const query = `
      INSERT INTO servico_prestado (id_prestador, id_servico_geral, nome, descricao, preco)
      VALUES($1, $2, $3, $4 ,$5)
    `;

    const values = [
      servicoPrestado.id_prestador,
      servicoPrestado.id_prestador,
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

  async close() {
    await this.conn.disconnect();
  }
}

export default ServicoPrestadoRepository;
