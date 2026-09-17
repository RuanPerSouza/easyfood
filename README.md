# EasyFood

Aplicação web para listar, pesquisar e cadastrar restaurantes usando Express e PostgreSQL.

## Estrutura

```text
easyfood/
├── public/                 # Interface estática (HTML, CSS e JavaScript)
├── src/
│   ├── app.js              # Configuração do Express e middlewares
│   ├── server.js           # Inicialização do servidor HTTP
│   ├── database/
│   │   └── connection.js   # Pool de conexões PostgreSQL
│   └── modules/
│       ├── categories/     # Rotas, controllers e serviços de categorias
│       └── restaurants/    # Rotas, controllers e serviços de restaurantes
├── docs/adrs/              # Decisões de arquitetura
└── package.json
```

## Executar

1. Copie `.env.example` para `.env` e ajuste as credenciais do PostgreSQL.
2. Instale as dependências com `npm install`.
3. Inicie a aplicação com `npm start`.
4. Acesse `http://localhost:3000`.

O HTML depende da API e não deve ser aberto sem o servidor. Se você abrir
`public/index.html` diretamente, mantenha o backend em execução com `npm start`
para que os dados sejam carregados de `http://localhost:3000`.

Os endpoints da API permanecem disponíveis em `/restaurants`, `/categories` e `/test-db`.

As decisões de arquitetura estão documentadas em [docs/adrs/README.md](docs/adrs/README.md).
