import conexao from "../../db.js";

export function listar(callback){
    const sql = "SELECT * FROM usuario ORDER BY id_usuario";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback){
    const sql = "SELECT * FROM usuario WHERE id_usuario = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback){
    const sql = "INSERT INTO usuario (nome, email, senha, cpf, endereco) VALUES (?, ?, ?, ?, ?)";
    conexao.query(sql, [dados.nome, dados.email, dados.senha, dados.cpf, dados.endereco], callback);
}

export function atualizar(id, dados, callback){
    const sql = "UPDATE usuario SET nome = ?, email = ?, senha = ?, cpf = ?, endereco = ? WHERE id_usuario = ?";
    conexao.query(sql, [dados.nome, dados.email, dados.senha, dados.cpf, dados.endereco, id], callback);
} 

export function excluir(id, callback){
    const sql = "DELETE FROM usuario WHERE id_usuario = ?";
    conexao.query(sql, [id], callback);
}
