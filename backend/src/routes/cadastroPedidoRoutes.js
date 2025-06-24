import express from "express";
import CadastroPedidoController from "../controllers/CadastroPedidoController.js";

const router = express.Router();

// POST /api/cadastro
router.post("/", CadastroPedidoController.cadastrarPedido);

export default router;
