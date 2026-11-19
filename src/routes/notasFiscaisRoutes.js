import { Router } from "express";

import { validarId } from "../middlewares/validarId.js";
import { validarNotaFiscal } from "../middlewares/validarNotaFiscal.js";
import * as notasFiscaisController from "../controllers/notasFiscaisController.js";

const router = Router();

router.get("/", notasFiscaisController.listar);
router.get("/:id", validarId, notasFiscaisController.buscarPorId);
router.post("/", validarNotaFiscal, notasFiscaisController.criar);
router.put("/:id", validarId, validarNotaFiscal, notasFiscaisController.atualizar);
router.delete("/:id", validarId, notasFiscaisController.excluir);

export default router;
