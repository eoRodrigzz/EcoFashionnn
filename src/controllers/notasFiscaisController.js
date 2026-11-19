import * as notasFiscaisModel from "../models/notasFiscaisModel.js";

export function listar(req, res, next) {
    notasFiscaisModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    notasFiscaisModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Nota fiscal não encontrada" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    notasFiscaisModel.criar(req.dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Nota fiscal cadastrada com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    notasFiscaisModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Nota fiscal não encontrada" });
        }
        notasFiscaisModel.atualizar(req.id, req.dados, (erro) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Nota fiscal atualizada com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    notasFiscaisModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Nota fiscal não encontrada" });
        }
        return res.status(200).json({ mensagem: "Nota fiscal excluída com sucesso" });
    });
}
