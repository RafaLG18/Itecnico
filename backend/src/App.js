import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath from the 'url' module
import cors from "cors";
// Get __filename and __dirname in ES Module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rotas da API
import cadastroUsuarioRoutes from "./routes/cadastroUsuarioRoutes.js";
import cadastroServicoGeralRoutes from "./routes/cadastroServicoGeralRoutes.js";
import cadastroServicoPrestadoRoutes from "./routes/cadastroServicoPrestadoRoutes.js";
import cadastroPedidoRoutes from "./routes/cadastroPedidoRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

const app = express();
app.use(express.json());
app.use(cors())
// Servir o frontend
// app.use(express.static(path.join(__dirname, "../../frontend")));

app.use("/api/cadastro-usuario", cadastroUsuarioRoutes);
app.use("/api/cadastro-servico-geral", cadastroServicoGeralRoutes);
app.use("/api/cadastro-servico-prestado", cadastroServicoPrestadoRoutes);
app.use("/api/cadastro-pedido", cadastroPedidoRoutes);
app.use("/api/login", loginRoutes);

export default app;
