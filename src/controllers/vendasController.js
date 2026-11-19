import * as vendasModel from "../models/vendasModel.js";

export function listar(req, res, next) {
    vendasModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    vendasModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Venda não encontrada" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    vendasModel.criar(req.dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Venda cadastrada com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    vendasModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Venda não encontrada" });
        }
        vendasModel.atualizar(req.id, req.dados, (erro) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Venda atualizada com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    vendasModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Venda não encontrada" });
        }
        return res.status(200).json({ mensagem: "Venda excluída com sucesso" });
    });
}
