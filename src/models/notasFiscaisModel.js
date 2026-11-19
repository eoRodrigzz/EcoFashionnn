import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM nota_fiscal ORDER BY id_nota_fiscal";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM nota_fiscal WHERE id_nota_fiscal = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO nota_fiscal (id_venda, id_usuario, numero_nota, chave_acesso, valor_total) VALUES (?, ?, ?, ?, ?)";
    conexao.query(sql, [
        dados.id_venda,
        dados.id_usuario,
        dados.numero_nota,
        dados.chave_acesso,
        dados.valor_total
    ], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE nota_fiscal SET id_venda = ?, id_usuario = ?, numero_nota = ?, chave_acesso = ?, valor_total = ? WHERE id_nota_fiscal = ?";
    conexao.query(sql, [
        dados.id_venda,
        dados.id_usuario,
        dados.numero_nota,
        dados.chave_acesso,
        dados.valor_total,
        id
    ], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM nota_fiscal WHERE id_nota_fiscal = ?";
    conexao.query(sql, [id], callback);
}
