import {
    inteiroPositivo,
    precoValido,
    textoValido
} from "../utils/validacoes.js";

export function validarNotaFiscal(req, res, next) {
    const {
        id_venda,
        id_usuario,
        numero_nota,
        chave_acesso,
        valor_total
    } = req.body ?? {};

    if (
        !inteiroPositivo(id_venda)
        || !inteiroPositivo(id_usuario)
        || !textoValido(numero_nota, 50)
        || typeof chave_acesso !== "string"
        || chave_acesso.length !== 44
        || !precoValido(valor_total)
    ) {
        return res.status(400).json({
            erro: "Informe id_venda e id_usuario como inteiros positivos, numero_nota (até 50 caracteres), chave_acesso com 44 caracteres e valor_total entre 0 e 99999999.99 com até 2 casas decimais"
        });
    }

    req.dados = {
        id_venda,
        id_usuario,
        numero_nota: numero_nota.trim(),
        chave_acesso,
        valor_total
    };
    next();
}
