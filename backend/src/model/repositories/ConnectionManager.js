// db.js
import {Client} from "pg";

class ConnectionManager {
  client = new Client({
    host: "localhost",
    port: 5432,
    user: "itecnico",
    password: "itecnico123",
    database: "itecnico",
  });
  constructor(parameters) {}

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected to PostgreSQL!");

      const res = await this.client.query("SELECT NOW()");
      console.log("Server time:", res.rows[0]);
    } catch (err) {
      console.error("Connection error", err.stack);
    }
  }

  getClient() {
    return this.client;
  }

  async disconnect() {
    await this.client.end();
    console.log("Disconnected from PostgreSQL.");
  }
}

export default ConnectionManager;