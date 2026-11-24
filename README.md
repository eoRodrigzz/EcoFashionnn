# EcoFashion API

API REST em Node.js, Express e MySQL.

## Executar

Configure as variáveis `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` e, opcionalmente, `PORTA` no arquivo `.env`. Crie as tabelas usando o esquema SQL do projeto e execute:

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` para acessar a vitrine. O catálogo e as categorias são carregados pela API; a sacola demonstrativa fica salva no armazenamento local do navegador. O checkout ainda não está implementado. A verificação da API está disponível em `GET /api/health`.

## Conta EcoFashion

A loja permite criar uma conta e entrar com e-mail e senha. O cadastro exige nome, e-mail, senha, CPF e endereço. As senhas são armazenadas com hash scrypt, e a sessão usa um cookie `HttpOnly` com validade de sete dias. As sessões ficam em memória e são encerradas quando o servidor reinicia.

| Ação | Caminho |
|---|---|
| Criar conta | `POST /auth/cadastro` |
| Entrar | `POST /auth/login` |
| Consultar conta atual | `GET /auth/me` |
| Sair | `POST /auth/logout` |

O carrinho continua salvo localmente e ainda não cria pedidos nem processa pagamentos.

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

As rotas `/usuarios` exigem uma sessão autenticada e permitem consultar ou alterar apenas os dados da própria conta. Para criar uma conta, use `POST /auth/cadastro`.
