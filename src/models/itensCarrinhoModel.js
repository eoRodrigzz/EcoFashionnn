import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM item_carrinho ORDER BY id_item_carrinho";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM item_carrinho WHERE id_item_carrinho = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO item_carrinho (id_carrinho, id_produto, quantidade) VALUES (?, ?, ?)";
    conexao.query(sql, [dados.id_carrinho, dados.id_produto, dados.quantidade], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE item_carrinho SET id_carrinho = ?, id_produto = ?, quantidade = ? WHERE id_item_carrinho = ?";
    conexao.query(sql, [dados.id_carrinho, dados.id_produto, dados.quantidade, id], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM item_carrinho WHERE id_item_carrinho = ?";
    conexao.query(sql, [id], callback);
}
