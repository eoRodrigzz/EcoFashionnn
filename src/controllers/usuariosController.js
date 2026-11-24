import * as usuariosModel from "../models/usuariosModel.js";
import { criarHashSenha } from "../utils/senhas.js";

export function listar(req, res, next) {
    usuariosModel.buscarPorId(req.sessao.idUsuario, (erro, resultado) => {
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

export async function criar(req, res, next) {
    try {
        const senha = await criarHashSenha(req.dados.senha);
        usuariosModel.criar({ ...req.dados, senha }, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso",
                id: resultado.insertId
            });
        });
    } catch (erro) {
        return next(erro);
    }
}

export async function atualizar(req, res, next) {
    usuariosModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        criarHashSenha(req.dados.senha).then((senha) => {
            usuariosModel.atualizar(req.id, { ...req.dados, senha }, (erroAoAtualizar) => {
                if (erroAoAtualizar) return next(erroAoAtualizar);
                return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
            });
        }).catch(next);
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