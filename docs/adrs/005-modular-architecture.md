# ADR-005 — Arquitetura modular por domínio

**Status:** Aceita  
**Data:** 10/09/2026

## Contexto

O backend começou concentrado em um único arquivo de servidor. Essa abordagem mistura configuração do Express, rotas, SQL, validações e tratamento de erros, dificultando manutenção e evolução.

## Decisão

Separar a aplicação em camadas simples e módulos por domínio:

```text
src/
├── app.js                 # configuração do Express
├── server.js              # processo HTTP
├── database/              # infraestrutura de banco
└── modules/
    ├── categories/        # routes, controller e service
    └── restaurants/       # routes, controller e service
```

- `routes` define os endpoints.
- `controller` interpreta a requisição e monta a resposta HTTP.
- `service` concentra regras de negócio e acesso aos dados do domínio.
- `app.js` é exportado separadamente para facilitar testes.
- `server.js` apenas inicia o processo HTTP.

## Justificativa

Essa separação mantém responsabilidades claras, reduz acoplamento e permite adicionar novos domínios sem transformar o servidor em um arquivo monolítico.

## Consequências

- Novos recursos devem ser adicionados dentro de seu próprio módulo.
- Consultas SQL não devem ser colocadas diretamente nas rotas.
- A estrutura é intencionalmente simples; uma camada de repositórios pode ser introduzida quando o volume de consultas justificar.
