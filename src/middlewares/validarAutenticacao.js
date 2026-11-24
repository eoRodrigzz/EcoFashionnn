export function validarCadastro(req, res, next) {
    const { nome, email, senha, cpf, endereco } = req.body ?? {};
    const nomeValido = typeof nome === "string" && nome.trim().length > 0 && nome.trim().length <= 100;
    const emailValido = typeof email === "string"
        && email.trim().length <= 100
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const senhaValida = typeof senha === "string" && senha.length >= 8 && senha.length <= 128;
    const cpfValido = typeof cpf === "string" && cpf.trim().length > 0 && cpf.trim().length <= 14;
    const enderecoValido = typeof endereco === "string"
        && endereco.trim().length > 0
        && endereco.trim().length <= 200;

    if (!nomeValido || !emailValido || !senhaValida || !cpfValido || !enderecoValido) {
        return res.status(400).json({
            erro: "Informe nome, e-mail válido, senha de 8 a 128 caracteres, CPF e endereço dentro dos limites permitidos."
        });
    }

    req.dados = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha,
        cpf: cpf.trim(),
        endereco: endereco.trim()
    };
    next();
}

export function validarCredenciais(req, res, next) {
    const { email, senha } = req.body ?? {};
    if (
        typeof email !== "string"
        || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        || typeof senha !== "string"
        || senha.length === 0
        || senha.length > 128
    ) {
        return res.status(400).json({ erro: "Informe um e-mail válido e uma senha." });
    }

    req.dados = { email: email.trim().toLowerCase(), senha };
    next();
}
