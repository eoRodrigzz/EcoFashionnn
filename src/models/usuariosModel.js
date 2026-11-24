import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT id_usuario, nome, email, cpf, endereco, criado_em FROM usuario ORDER BY id_usuario";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT id_usuario, nome, email, cpf, endereco, criado_em FROM usuario WHERE id_usuario = ?";
    conexao.query(sql, [id], callback);
}

export function buscarPorEmail(email, callback) {
    const sql = "SELECT id_usuario, nome, email, senha, criado_em FROM usuario WHERE email = ?";
    conexao.query(sql, [email], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO usuario (nome, email, senha, cpf, endereco) VALUES (?, ?, ?, ?, ?)";
    conexao.query(sql, [
        dados.nome,
        dados.email,
        dados.senha,
        dados.cpf,
        dados.endereco
    ], callback);
}

export function atualizarSenha(id, senha, callback) {
    const sql = "UPDATE usuario SET senha = ? WHERE id_usuario = ?";
    conexao.query(sql, [senha, id], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE usuario SET nome = ?, email = ?, senha = ?, cpf = ?, endereco = ? WHERE id_usuario = ?";
    conexao.query(sql, [
        dados.nome,
        dados.email,
        dados.senha,
        dados.cpf,
        dados.endereco,
        id
    ], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM usuario WHERE id_usuario = ?";
    conexao.query(sql, [id], callback);
}