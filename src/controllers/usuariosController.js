import * as usuariosModel from "../models/usuariosModel.js";

export function listar(req, res, next) {
    usuariosModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    usuariosModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    usuariosModel.criar(req.dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    usuariosModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        usuariosModel.atualizar(req.id, req.dados, (erro) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    usuariosModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        return res.status(200).json({ mensagem: "Usuário excluído com sucesso" });
    });
}