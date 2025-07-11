import express from "express";
import CadastroServicoPrestadoController from "../controllers/CadastroServicoPrestadoController.js";

const router = express.Router();

// POST /api/cadastro
router.post("/", CadastroServicoPrestadoController.cadastrarServicoPrestado);

export default router;
