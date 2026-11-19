import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM produto ORDER BY id_produto";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM produto WHERE id_produto = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO produto (nome, descricao, preco, estoque, tamanho, material_sustentavel, imagem_url, tecnica_upcycling, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    conexao.query(sql, [
        dados.nome,
        dados.descricao,
        dados.preco,
        dados.estoque,
        dados.tamanho,
        dados.material_sustentavel,
        dados.imagem_url,
        dados.tecnica_upcycling,
        dados.id_categoria
    ], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE produto SET nome = ?, descricao = ?, preco = ?, estoque = ?, tamanho = ?, material_sustentavel = ?, imagem_url = ?, tecnica_upcycling = ?, id_categoria = ? WHERE id_produto = ?";
    conexao.query(sql, [
        dados.nome,
        dados.descricao,
        dados.preco,
        dados.estoque,
        dados.tamanho,
        dados.material_sustentavel,
        dados.imagem_url,
        dados.tecnica_upcycling,
        dados.id_categoria,
        id
    ], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM produto WHERE id_produto = ?";
    conexao.query(sql, [id], callback);
}