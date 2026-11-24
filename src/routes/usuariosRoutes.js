import { Router } from "express";

import { validarId } from "../middlewares/validarId.js";
import { validarUsuarios } from "../middlewares/validarUsuarios.js";
import { exigirAutenticacao, exigirProprioUsuario } from "../middlewares/exigirAutenticacao.js";
import * as usuariosController from "../controllers/usuariosController.js";

const router = Router();

router.use(exigirAutenticacao);
router.get("/", usuariosController.listar);
router.get("/:id", validarId, exigirProprioUsuario, usuariosController.buscarPorId);
router.post("/", validarUsuarios, usuariosController.criar);
router.put("/:id", validarId, exigirProprioUsuario, validarUsuarios, usuariosController.atualizar);
router.delete("/:id", validarId, exigirProprioUsuario, usuariosController.excluir);

export default router;
