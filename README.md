# EcoFashion API

API REST em Node.js, Express e MySQL.

## Executar

Configure as variáveis `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` e, opcionalmente, `PORTA` no arquivo `.env`. Crie as tabelas usando o esquema SQL do projeto e execute:

```bash
npm install
npm run dev
```

## Endpoints

Todas as coleções abaixo aceitam `GET` para listar e `POST` para criar. Cada recurso também aceita `GET /:id`, `PUT /:id` e `DELETE /:id`.

| Recurso | Caminho |
|---|---|
| Categorias | `/categorias` |
| Produtos | `/produtos` |
| Usuários | `/usuarios` |
| Carrinhos | `/carrinhos` |
| Itens do carrinho | `/itens-carrinho` |
| Vendas | `/vendas` |
| Itens da venda | `/itens-venda` |
| Notas fiscais | `/notas-fiscais` |

Os corpos de criação e atualização usam JSON com os nomes de campos definidos nas tabelas SQL. Campos de chave primária e timestamps automáticos são gerados pelo banco. `imagem_url` e `status_venda` são opcionais. As operações de vendas são CRUDs independentes; não realizam checkout, cálculo automático de total ou baixa de estoque.
