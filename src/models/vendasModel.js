import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM venda ORDER BY id_venda";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM venda WHERE id_venda = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO venda (id_usuario, status_venda, valor_total) VALUES (?, ?, ?)";
    conexao.query(sql, [dados.id_usuario, dados.status_venda, dados.valor_total], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE venda SET id_usuario = ?, status_venda = ?, valor_total = ? WHERE id_venda = ?";
    conexao.query(sql, [dados.id_usuario, dados.status_venda, dados.valor_total, id], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM venda WHERE id_venda = ?";
    conexao.query(sql, [id], callback);
}
