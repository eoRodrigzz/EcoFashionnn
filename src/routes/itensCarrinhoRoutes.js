import { Router } from "express";

import { validarId } from "../middlewares/validarId.js";
import { validarItemCarrinho } from "../middlewares/validarItemCarrinho.js";
import * as itensCarrinhoController from "../controllers/itensCarrinhoController.js";

const router = Router();

router.get("/", itensCarrinhoController.listar);
router.get("/:id", validarId, itensCarrinhoController.buscarPorId);
router.post("/", validarItemCarrinho, itensCarrinhoController.criar);
router.put("/:id", validarId, validarItemCarrinho, itensCarrinhoController.atualizar);
router.delete("/:id", validarId, itensCarrinhoController.excluir);

export default router;
