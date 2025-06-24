import ConnectionManager from "./ConnectionManager.js";
class ServicoRepository{
    constructor(){
        this.conn = new ConnectionManager();
    }

    
  async setServico(servico) {
    let client;
    const query = `
      INSERT INTO servico (id_usuario, nome, descricao, preco)
      VALUES($1, $2, $3, $4)
    `;
    
    const values = [
      servico.id_usuario,
      servico.nome,
      servico.descricao,
      servico.preco
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
export default ServicoRepository