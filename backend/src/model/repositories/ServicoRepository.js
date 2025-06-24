import ConnectionManager from "./ConnectionManager.js";
class ServicoRepository{
    constructor(){
        this.conn = new ConnectionManager();
        this.client = null;
    }

    async init() {
    await this.conn.connect(); // Estabelece a conexão
    this.client = this.conn.getClient();
  }

  async setServico(servico) {

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
export default ServicoRepository