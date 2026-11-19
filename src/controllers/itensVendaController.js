import * as itensVendaModel from "../models/itensVendaModel.js";

export function listar(req, res, next) {
    itensVendaModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    itensVendaModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Item da venda não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    itensVendaModel.criar(req.dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Item da venda cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    itensVendaModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Item da venda não encontrado" });
        }
        itensVendaModel.atualizar(req.id, req.dados, (erro) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Item da venda atualizado com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    itensVendaModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Item da venda não encontrado" });
        }
        return res.status(200).json({ mensagem: "Item da venda excluído com sucesso" });
    });
}
