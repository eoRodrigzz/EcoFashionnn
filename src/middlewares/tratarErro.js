export function tratarErro(erro, req, res, next){
    console.error(erro);
    if (erro.type === "entity.parse.failed"){
        return res.status(400).json({erro: "JSON inválido"});
    }
    if (erro.code === "ER_DUP_ENTRY"){
        return res.status(400).json({erro: "Já existe um registro com esse valor"});
    }
    if (erro.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({ erro: "Registro relacionado não existe (ex.: categoria inexistente)" });
    }
    if (erro.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(409).json({ erro: "Não é possível excluir: existem registros vinculados a ele" });
    }
    return res.status(500).json({ erro: "Erro interno do servidor" });
}