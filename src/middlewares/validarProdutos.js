import {
    inteiroNaoNegativo,
    inteiroPositivo,
    precoValido,
    textoValido
} from "../utils/validacoes.js";

export function validarProdutos(req, res, next) {
    const {
        nome,
        descricao,
        preco,
        estoque,
        tamanho,
        material_sustentavel,
        imagem_url,
        tecnica_upcycling,
        id_categoria
    } = req.body ?? {};

    const imagemValida = imagem_url === undefined
        || imagem_url === null
        || textoValido(imagem_url, 255);

    if (
        !textoValido(nome, 100)
        || !textoValido(descricao, 65535)
        || !precoValido(preco)
        || !inteiroNaoNegativo(estoque)
        || !textoValido(tamanho, 5)
        || !textoValido(material_sustentavel, 100)
        || !imagemValida
        || !inteiroNaoNegativo(tecnica_upcycling)
        || !inteiroPositivo(id_categoria)
    ) {
        return res.status(400).json({
            erro: "Informe nome (até 100 caracteres), descricao, preço válido (até 99999999.99 com até 2 casas decimais), estoque (inteiro não negativo), tamanho (até 5 caracteres), material_sustentavel (até 100 caracteres), tecnica_upcycling (inteiro não negativo) e id_categoria (inteiro positivo). imagem_url é opcional (até 255 caracteres)"
        });
    }

    req.dados = {
        nome: nome.trim(),
        descricao: descricao.trim(),
        preco,
        estoque,
        tamanho: tamanho.trim(),
        material_sustentavel: material_sustentavel.trim(),
        imagem_url: imagem_url == null ? null : imagem_url.trim(),
        tecnica_upcycling,
        id_categoria
    };
    next();
}