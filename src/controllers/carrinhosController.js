import * as carrinhosModel from "../models/carrinhosModel.js";

export function listar(req, res, next) {
    carrinhosModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    carrinhosModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Carrinho não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    carrinhosModel.criar(req.dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Carrinho cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    carrinhosModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Carrinho não encontrado" });
        }
        carrinhosModel.atualizar(req.id, req.dados, (erro) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Carrinho atualizado com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    carrinhosModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Carrinho não encontrado" });
        }
        return res.status(200).json({ mensagem: "Carrinho excluído com sucesso" });
    });
}
