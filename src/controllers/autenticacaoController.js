import * as usuariosModel from "../models/usuariosModel.js";
import { criarHashSenha, senhaJaFoiHasheada, verificarSenha } from "../utils/senhas.js";
import { buscarSessao, criarSessao, definirCookieSessao, removerCookieSessao } from "../utils/sessoes.js";

function usuarioPublico(usuario) {
    return {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        criado_em: usuario.criado_em
    };
}

function buscarPorEmail(email, callback) {
    usuariosModel.buscarPorEmail(email, callback);
}

export async function cadastrar(req, res, next) {
    try {
        const senhaHash = await criarHashSenha(req.dados.senha);
        usuariosModel.criar({ ...req.dados, senha: senhaHash }, (erro, resultado) => {
            if (erro?.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ erro: "Este e-mail já possui uma conta." });
            }
            if (erro) return next(erro);

            const usuario = { id_usuario: resultado.insertId, ...req.dados };
            const token = criarSessao(usuario.id_usuario);
            definirCookieSessao(req, res, token);
            return res.status(201).json({ usuario: usuarioPublico(usuario) });
        });
    } catch (erro) {
        return next(erro);
    }
}

export function entrar(req, res, next) {
    buscarPorEmail(req.dados.email, async (erro, registros) => {
        if (erro) return next(erro);
        const usuario = registros[0];
        if (!usuario) return res.status(401).json({ erro: "E-mail ou senha inválidos." });

        try {
            if (!(await verificarSenha(req.dados.senha, usuario.senha))) {
                return res.status(401).json({ erro: "E-mail ou senha inválidos." });
            }

            const criarSessaoDoUsuario = () => {
                const token = criarSessao(usuario.id_usuario);
                definirCookieSessao(req, res, token);
                return res.status(200).json({ usuario: usuarioPublico(usuario) });
            };

            if (senhaJaFoiHasheada(usuario.senha)) return criarSessaoDoUsuario();

            const senhaHash = await criarHashSenha(req.dados.senha);
            usuariosModel.atualizarSenha(usuario.id_usuario, senhaHash, (erroAoAtualizar) => {
                if (erroAoAtualizar) return next(erroAoAtualizar);
                return criarSessaoDoUsuario();
            });
        } catch (erroAoVerificar) {
            return next(erroAoVerificar);
        }
    });
}

export function atual(req, res, next) {
    const sessao = buscarSessao(req);
    if (!sessao) {
        removerCookieSessao(req, res);
        return res.status(401).json({ erro: "Faça login para continuar." });
    }

    usuariosModel.buscarPorId(sessao.idUsuario, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            removerCookieSessao(req, res, sessao.token);
            return res.status(401).json({ erro: "Faça login para continuar." });
        }
        return res.status(200).json({ usuario: usuarioPublico(registros[0]) });
    });
}

export function sair(req, res) {
    const sessao = buscarSessao(req);
    removerCookieSessao(req, res, sessao?.token);
    return res.status(204).end();
}
