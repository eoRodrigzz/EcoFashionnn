import {
    inteiroPositivo,
    precoValido
} from "../utils/validacoes.js";

export function validarItemVenda(req, res, next) {
    const { id_venda, id_produto, quantidade, preco_unitario } = req.body ?? {};

    if (
        !inteiroPositivo(id_venda)
        || !inteiroPositivo(id_produto)
        || !inteiroPositivo(quantidade)
        || !precoValido(preco_unitario)
    ) {
        return res.status(400).json({
            erro: "Informe id_venda, id_produto e quantidade como inteiros positivos e preco_unitario entre 0 e 99999999.99 com até 2 casas decimais"
        });
    }

    req.dados = { id_venda, id_produto, quantidade, preco_unitario };
    next();
}
