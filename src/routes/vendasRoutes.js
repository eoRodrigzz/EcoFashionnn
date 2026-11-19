import { Router } from "express";

import { validarId } from "../middlewares/validarId.js";
import { validarVenda } from "../middlewares/validarVenda.js";
import * as vendasController from "../controllers/vendasController.js";

const router = Router();

router.get("/", vendasController.listar);
router.get("/:id", validarId, vendasController.buscarPorId);
router.post("/", validarVenda, vendasController.criar);
router.put("/:id", validarId, validarVenda, vendasController.atualizar);
router.delete("/:id", validarId, vendasController.excluir);

export default router;
