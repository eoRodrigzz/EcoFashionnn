import { Router } from "express";

import { validarId } from "../middlewares/validarId.js";
import { validarUsuarios } from "../middlewares/validarUsuarios.js";
import * as usuariosController from "../controllers/usuariosController.js";

const router = Router();

router.get("/", usuariosController.listar);
router.get("/:id", validarId, usuariosController.buscarPorId);
router.post("/", validarUsuarios, usuariosController.criar);
router.put("/:id", validarId, validarUsuarios, usuariosController.atualizar);
router.delete("/:id", validarId, usuariosController.excluir);

export default router;
