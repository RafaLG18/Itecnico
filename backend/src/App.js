import express from "express";
import path from "path";
import { fileURLToPath } from 'url'; // Import fileURLToPath from the 'url' module

// Get __filename and __dirname in ES Module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rotas da API
import cadastroUsuarioRoutes from "./routes/cadastroUsuarioRoutes.js";
import cadastroServicoRoutes from "./routes/cadastroServicoRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

const app = express();
app.use(express.json());

// Servir o frontend
app.use(express.static(path.join(__dirname, "../../frontend")));

app.use("/api/cadastro-usuario", cadastroUsuarioRoutes);
app.use("/api/cadastro-servico", cadastroServicoRoutes);
app.use("/api/login", loginRoutes);

export default app; 