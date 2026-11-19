import { Router } from "express";

import { validarId } from "../middlewares/validarId.js";
import { validarItemVenda } from "../middlewares/validarItemVenda.js";
import * as itensVendaController from "../controllers/itensVendaController.js";

const router = Router();

router.get("/", itensVendaController.listar);
router.get("/:id", validarId, itensVendaController.buscarPorId);
router.post("/", validarItemVenda, itensVendaController.criar);
router.put("/:id", validarId, validarItemVenda, itensVendaController.atualizar);
router.delete("/:id", validarId, itensVendaController.excluir);

export default router;
