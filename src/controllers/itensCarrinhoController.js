import * as itensCarrinhoModel from "../models/itensCarrinhoModel.js";

export function listar(req, res, next) {
    itensCarrinhoModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    itensCarrinhoModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Item do carrinho não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    itensCarrinhoModel.criar(req.dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Item do carrinho cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    itensCarrinhoModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Item do carrinho não encontrado" });
        }
        itensCarrinhoModel.atualizar(req.id, req.dados, (erro) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Item do carrinho atualizado com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    itensCarrinhoModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Item do carrinho não encontrado" });
        }
        return res.status(200).json({ mensagem: "Item do carrinho excluído com sucesso" });
    });
}
