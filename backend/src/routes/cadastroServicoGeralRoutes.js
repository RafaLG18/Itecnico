import express from "express";
import CadastroServicoGeralController from "../controllers/CadastroServicoGeralController.js";

const router = express.Router();

// POST /api/cadastro
router.post("/", CadastroServicoGeralController.cadastrarServicoGeral);
router.get("/", CadastroServicoGeralController.getServicoGeral);

export default router;
