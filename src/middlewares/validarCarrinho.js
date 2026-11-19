import { inteiroPositivo } from "../utils/validacoes.js";

export function validarCarrinho(req, res, next) {
    const { id_usuario } = req.body ?? {};

    if (!inteiroPositivo(id_usuario)) {
        return res.status(400).json({
            erro: "Informe id_usuario como inteiro positivo"
        });
    }

    req.dados = { id_usuario };
    next();
}
