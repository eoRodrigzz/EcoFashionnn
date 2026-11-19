import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM carrinho ORDER BY id_carrinho";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM carrinho WHERE id_carrinho = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO carrinho (id_usuario) VALUES (?)";
    conexao.query(sql, [dados.id_usuario], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE carrinho SET id_usuario = ? WHERE id_carrinho = ?";
    conexao.query(sql, [dados.id_usuario, id], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM carrinho WHERE id_carrinho = ?";
    conexao.query(sql, [id], callback);
}
