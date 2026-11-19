import * as categoriasModel from "../models/categoriasModel.js";

export function listar(req, res, next) {
    categoriasModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    categoriasModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Categoria não encontrada" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    categoriasModel.criar(req.dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Categoria cadastrada com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    categoriasModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Categoria não encontrada" });
        }
        categoriasModel.atualizar(req.id, req.dados, (erro) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Categoria atualizada com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    categoriasModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Categoria não encontrada" });
        }
        return res.status(200).json({ mensagem: "Categoria excluída com sucesso" });
    });
}