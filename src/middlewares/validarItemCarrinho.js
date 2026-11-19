import {
    inteiroPositivo,
    inteiroNaoNegativo
} from "../utils/validacoes.js";

export function validarItemCarrinho(req, res, next) {
    const { id_carrinho, id_produto, quantidade } = req.body ?? {};

    if (
        !inteiroPositivo(id_carrinho)
        || !inteiroPositivo(id_produto)
        || !inteiroNaoNegativo(quantidade)
        || quantidade === 0
    ) {
        return res.status(400).json({
            erro: "Informe id_carrinho e id_produto como inteiros positivos e quantidade como inteiro positivo"
        });
    }

    req.dados = { id_carrinho, id_produto, quantidade };
    next();
}
