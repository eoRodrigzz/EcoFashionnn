import { randomBytes } from "node:crypto";

const NOME_COOKIE = "ecofashion_session";
const DURACAO_SESSAO_MS = 7 * 24 * 60 * 60 * 1000;
const sessoes = new Map();

export function criarSessao(idUsuario) {
    const agora = Date.now();
    for (const [token, sessao] of sessoes) {
        if (sessao.expiraEm <= agora) sessoes.delete(token);
    }

    const token = randomBytes(32).toString("base64url");
    sessoes.set(token, { idUsuario, expiraEm: agora + DURACAO_SESSAO_MS });
    return token;
}

export function buscarSessao(req) {
    const prefixo = `${NOME_COOKIE}=`;
    const cookie = (req.headers.cookie ?? "").split(";").map((item) => item.trim())
        .find((item) => item.startsWith(prefixo));
    if (!cookie) return null;

    const token = cookie.slice(prefixo.length);
    const sessao = sessoes.get(token);
    if (!sessao) return null;
    if (sessao.expiraEm <= Date.now()) {
        sessoes.delete(token);
        return null;
    }
    return { token, ...sessao };
}

export function definirCookieSessao(req, res, token) {
    const seguro = req.secure || process.env.NODE_ENV === "production" ? "; Secure" : "";
    res.append(
        "Set-Cookie",
        `${NOME_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${DURACAO_SESSAO_MS / 1000}${seguro}`
    );
}

export function removerCookieSessao(req, res, token) {
    if (token) sessoes.delete(token);
    const seguro = req.secure || process.env.NODE_ENV === "production" ? "; Secure" : "";
    res.append("Set-Cookie", `${NOME_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${seguro}`);
}
