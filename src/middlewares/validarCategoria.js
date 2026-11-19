import { textoValido } from "../utils/validacoes.js";

export function validarCategoria(req, res, next) {
    const { nome, descricao } = req.body ?? {};
    const descricaoInformada = descricao !== undefined && descricao !== null;

    if (!textoValido(nome, 50) || (descricaoInformada && !textoValido(descricao, 1000))) {
        return res.status(400).json({
            erro: "Informe nome (até 50 caracteres) e descricao (até 1000 caracteres)"
        });
    }

    req.dados = {
        nome: nome.trim(),
        descricao: descricaoInformada ? descricao.trim() : null
    };
    next();
}