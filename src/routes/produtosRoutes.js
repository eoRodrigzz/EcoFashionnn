import { Router } from "express";

import { validarId } from "../middlewares/validarId.js";
import { validarProdutos } from "../middlewares/validarProdutos.js";
import * as produtosController from "../controllers/produtosController.js";

const router = Router();

router.get("/", produtosController.listar);
router.get("/:id", validarId, produtosController.buscarPorId);
router.post("/", validarProdutos, produtosController.criar);
router.put("/:id", validarId, validarProdutos, produtosController.atualizar);
router.delete("/:id", validarId, produtosController.excluir);

export default router;
