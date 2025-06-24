import express from "express";
import CadastroUsuarioController from "../controllers/CadastroUsuarioController.js";

const router = express.Router();

// POST /api/cadastro
router.post("/", CadastroUsuarioController.cadastrarUsuario);

export default router;
