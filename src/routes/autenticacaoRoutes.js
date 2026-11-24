import { Router } from "express";

import * as autenticacaoController from "../controllers/autenticacaoController.js";
import { validarCadastro, validarCredenciais } from "../middlewares/validarAutenticacao.js";

const router = Router();

router.post("/cadastro", validarCadastro, autenticacaoController.cadastrar);
router.post("/login", validarCredenciais, autenticacaoController.entrar);
router.get("/me", autenticacaoController.atual);
router.post("/logout", autenticacaoController.sair);

export default router;
