import express from "express";
import CadastroPedidoController from "../controllers/CadastroPedidoController.js";

const router = express.Router();

// POST /api/cadastro
router.post("/", CadastroPedidoController.cadastrarPedido);
router.get("/prestador/:id_prestador", CadastroPedidoController.getPedidosByPrestador);
router.get("/cliente/:id_cliente", CadastroPedidoController.getPedidosByCliente);
router.delete("/:id", CadastroPedidoController.cancelarPedido);

export default router;
