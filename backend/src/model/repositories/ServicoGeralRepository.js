import ConnectionManager from "./ConnectionManager.js";
class ServicoGeralRepository{
    constructor(){
        this.conn = new ConnectionManager();
    }

    
  async setServicoGeral(servicoGeral) {
    let client;
    const query = `
      INSERT INTO servico_geral (id_prestador, nome, descricao)
      VALUES($1, $2, $3)
    `;
    
    const values = [
      servicoGeral.id_prestador,
      servicoGeral.nome,
      servicoGeral.descricao,
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
export default ServicoGeralRepository