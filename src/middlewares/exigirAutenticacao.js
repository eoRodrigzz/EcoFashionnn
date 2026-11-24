import * as usuariosModel from "../models/usuariosModel.js";
import { buscarSessao, removerCookieSessao } from "../utils/sessoes.js";

export function exigirAutenticacao(req, res, next) {
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

        req.sessao = { ...sessao, usuario: registros[0] };
        return next();
    });
}

export function exigirProprioUsuario(req, res, next) {
    if (Number(req.id) !== Number(req.sessao.idUsuario)) {
        return res.status(403).json({ erro: "Você só pode acessar os dados da sua própria conta." });
    }
    return next();
}
