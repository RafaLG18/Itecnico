// ConnectionManager.js
import { Pool } from "pg";

class ConnectionManager {
  // Uma propriedade estática para armazenar a única instância do Pool
  static poolInstance = null;

  constructor() {
    // Verifica se já existe uma instância do pool
    if (!ConnectionManager.poolInstance) {
      // Se não existir, cria o pool pela primeira vez
      ConnectionManager.poolInstance = new Pool({
        host: "localhost",
        port: 5432,
        user: "itecnico",
        password: "itecnico123",
        database: "itecnico",
      });

      // Opcional: Um listener para capturar erros inesperados do pool
      ConnectionManager.poolInstance.on('error', (err) => {
        console.error('Erro inesperado no cliente ocioso do pool:', err);
        // Em um ambiente de produção, você pode querer registrar isso e sair,
        // ou ter uma estratégia de recuperação mais robusta.
      });

      console.log("Pool de banco de dados inicializado.");
    }
    // Atribui a instância única do pool à propriedade da instância da classe
    this.pool = ConnectionManager.poolInstance;
  }

  async getClient() {
    // Garante que o pool exista antes de tentar pegar um cliente
    if (!this.pool) {
      throw new Error("Pool de conexão não foi inicializado.");
    }
    return await this.pool.connect(); // Pega uma conexão do pool
  }

  async disconnect() {
    // Apenas encerra o pool se ele existir
    if (ConnectionManager.poolInstance) {
      await ConnectionManager.poolInstance.end(); // Usado só ao encerrar o app (por exemplo, ao dar Ctrl+C)
      ConnectionManager.poolInstance = null; // Limpa a referência para que possa ser recriado se necessário
      console.log("Pool encerrado.");
    }
  }
}

export default ConnectionManager;