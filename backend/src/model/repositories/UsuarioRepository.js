import ConnectionManager from "./ConnectionManager.js";

class UsuarioRepository {
  constructor() {
    this.conn = new ConnectionManager();
    this.client = null;
  }

  async init() {
    await this.conn.connect(); // Estabelece a conexão
    this.client = this.conn.getClient();
  }

  async setUsuario(usuario) {

    const query = `
      INSERT INTO usuario (nome, cpf, senha, tipo)
      VALUES($1, $2, $3, $4)
    `;
    
    const values = [
      usuario.getNome(),
      usuario.getCpf(),
      usuario.getSenha(),
      usuario.getTipo()
    ];
    console.log(values)
    try {
      await this.init();
      await this.client.query(query, values);
      await this.close();
      
    } catch (err) {
      console.error("Erro ao inserir usuário:", err);
      throw err;
    }
  }

  async close() {
    await this.conn.disconnect();
  }
}
export default UsuarioRepository;

