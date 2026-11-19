import { Router } from "express";

import { validarId } from "../middlewares/validarId.js";
import { validarCarrinho } from "../middlewares/validarCarrinho.js";
import * as carrinhosController from "../controllers/carrinhosController.js";

const router = Router();

router.get("/", carrinhosController.listar);
router.get("/:id", validarId, carrinhosController.buscarPorId);
router.post("/", validarCarrinho, carrinhosController.criar);
router.put("/:id", validarId, validarCarrinho, carrinhosController.atualizar);
router.delete("/:id", validarId, carrinhosController.excluir);

export default router;
