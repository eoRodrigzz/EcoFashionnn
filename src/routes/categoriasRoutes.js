import {Router} from "express";

import {validarId} from "../middlewares/validarId.js";
import {validarCategoria} from "../middlewares/validarCategoria.js";
import * as categoriasController from "../controllers/categoriasController.js";

const router = Router();

router.get("/", categoriasController.listar);
router.get("/:id", validarId, categoriasController.buscarPorId);
router.post("/", validarCategoria, categoriasController.criar);
router.put("/:id", validarId, validarCategoria, categoriasController.atualizar);
router.delete("/:id", validarId, categoriasController.excluir);

export default router;
