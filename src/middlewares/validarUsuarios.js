import { textoValido } from "../utils/validacoes.js";

export function validarUsuarios(req, res, next) {
    const { nome, email, senha, cpf, endereco } = req.body ?? {};
    const emailValido = textoValido(email, 100)
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (
        !textoValido(nome, 100)
        || !emailValido
        || !textoValido(senha, 255)
        || !textoValido(cpf, 14)
        || !textoValido(endereco, 200)
    ) {
        return res.status(400).json({
            erro: "Informe nome (até 100 caracteres), email válido (até 100 caracteres), senha (até 255 caracteres), cpf (até 14 caracteres) e endereco (até 200 caracteres)"
        });
    }

    req.dados = {
        nome: nome.trim(),
        email: email.trim(),
        senha: senha.trim(),
        cpf: cpf.trim(),
        endereco: endereco.trim()
    };
    next();
}