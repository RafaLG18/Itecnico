import ConnectionManager from "./ConnectionManager.js";

class UsuarioRepository {
  constructor() {
    this.conn = new ConnectionManager();
    // this.client = null;
  }
  async setUsuario(usuario) {
    let client;
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
      client = await this.conn.getClient();
      await client.query(query, values);   
    } catch (err) {
      console.error("Erro ao inserir usuário:", err);
      throw err;
    } finally {
      if(client){
        client.release()
      }
    }
  }

  async findByCpfAndSenha(cpf, senha) {
    let client;
    const query = `
      SELECT id, nome, cpf, tipo
      FROM usuario 
      WHERE cpf = $1 AND senha = $2
    `;
    
    try {
      client = await this.conn.getClient();
      const result = await client.query(query, [cpf, senha]);
      
      if (result.rows.length > 0) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
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
export default UsuarioRepository;

