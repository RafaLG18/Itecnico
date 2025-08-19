import express from "express";
import CadastroServicoPrestadoController from "../controllers/CadastroServicoPrestadoController.js";

const router = express.Router();

// POST /api/cadastro
router.post("/", CadastroServicoPrestadoController.cadastrarServicoPrestado);
router.get("/", CadastroServicoPrestadoController.getServicosPrestado);
router.get("/:id", CadastroServicoPrestadoController.getServicoPrestadoById);
router.put("/:id", CadastroServicoPrestadoController.atualizarServicoPrestado);

export default router;
