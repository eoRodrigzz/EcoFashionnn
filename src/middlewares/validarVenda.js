import {
    inteiroPositivo,
    precoValido,
    textoValido
} from "../utils/validacoes.js";

export function validarVenda(req, res, next) {
    const { id_usuario, status_venda, valor_total } = req.body ?? {};
    const statusValido = status_venda === undefined
        || status_venda === null
        || textoValido(status_venda, 30);

    if (
        !inteiroPositivo(id_usuario)
        || !statusValido
        || !precoValido(valor_total)
    ) {
        return res.status(400).json({
            erro: "Informe id_usuario como inteiro positivo, valor_total entre 0 e 99999999.99 com até 2 casas decimais e status_venda opcional (até 30 caracteres)"
        });
    }

    req.dados = {
        id_usuario,
        status_venda: status_venda == null ? null : status_venda.trim(),
        valor_total
    };
    next();
}
