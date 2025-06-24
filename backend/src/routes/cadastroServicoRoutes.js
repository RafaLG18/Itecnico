import express from "express";
import CadastroServicoController from "../controllers/CadastroServicoController.js";

const router = express.Router();

// POST /api/cadastro
router.post("/", CadastroServicoController.cadastrarServico);

export default router;
