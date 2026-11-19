import conexao from "../../db.js";

export function listar(callback){
    const sql = "SELECT * FROM categoria ORDER BY id_categoria";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback){
    const sql = "SELECT * FROM categoria WHERE id_categoria = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback){
    const sql = "INSERT INTO categoria (nome, descricao) VALUES (?, ?)";
    conexao.query(sql, [dados.nome, dados.descricao], callback);
}

export function atualizar(id, dados, callback){
    const sql = "UPDATE categoria SET nome = ?, descricao = ? WHERE id_categoria = ?";
    conexao.query(sql, [dados.nome, dados.descricao, id], callback);
} 

export function excluir(id, callback){
    const sql = "DELETE FROM categoria WHERE id_categoria = ?";
    conexao.query(sql, [id], callback);
}

