import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM item_venda ORDER BY id_item_venda";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM item_venda WHERE id_item_venda = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO item_venda (id_venda, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)";
    conexao.query(sql, [dados.id_venda, dados.id_produto, dados.quantidade, dados.preco_unitario], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE item_venda SET id_venda = ?, id_produto = ?, quantidade = ?, preco_unitario = ? WHERE id_item_venda = ?";
    conexao.query(sql, [dados.id_venda, dados.id_produto, dados.quantidade, dados.preco_unitario, id], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM item_venda WHERE id_item_venda = ?";
    conexao.query(sql, [id], callback);
}
