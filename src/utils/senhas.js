import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const TAMANHO_CHAVE = 64;

export async function criarHashSenha(senha) {
    const salt = randomBytes(16);
    const chave = await scrypt(senha, salt, TAMANHO_CHAVE, { maxmem: 64 * 1024 * 1024 });
    return `scrypt$${salt.toString("base64url")}$${chave.toString("base64url")}`;
}

export async function verificarSenha(senha, hash) {
    const [algoritmo, saltCodificado, chaveCodificada, extra] = String(hash).split("$");
    if (algoritmo !== "scrypt" || !saltCodificado || !chaveCodificada || extra !== undefined) {
        const senhaInformada = Buffer.from(senha);
        const senhaArmazenada = Buffer.from(String(hash));
        return senhaInformada.length === senhaArmazenada.length
            && timingSafeEqual(senhaInformada, senhaArmazenada);
    }

    const salt = Buffer.from(saltCodificado, "base64url");
    const chaveArmazenada = Buffer.from(chaveCodificada, "base64url");
    if (salt.length !== 16 || chaveArmazenada.length !== TAMANHO_CHAVE) return false;

    const chaveInformada = await scrypt(senha, salt, TAMANHO_CHAVE, { maxmem: 64 * 1024 * 1024 });
    return timingSafeEqual(chaveInformada, chaveArmazenada);
}

export function senhaJaFoiHasheada(hash) {
    return String(hash).startsWith("scrypt$");
}
