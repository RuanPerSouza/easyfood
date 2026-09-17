# ADR-004 — Biblioteca `pg` e pool de conexões

**Status:** Aceita  
**Data:** 10/09/2026

## Contexto

O EasyFood usa Node.js e PostgreSQL. A aplicação precisa de uma biblioteca para executar SQL e gerenciar conexões sem espalhar a configuração do banco pelos módulos.

## Decisão

Utilizar `pg` (`node-postgres`) com `Pool`. A conexão fica centralizada em `src/database/connection.js` e os serviços acessam o banco através de consultas parametrizadas com `pool.query()`.

```text
src/
└── database/
    └── connection.js
```

As credenciais são lidas por variáveis de ambiente, com valores locais de desenvolvimento documentados em `.env.example`.

## Justificativa

- Permite SQL explícito e controle sobre as consultas.
- Oferece pooling de conexões.
- É compatível diretamente com PostgreSQL.
- Evita adicionar um ORM sem necessidade para o escopo atual.

## Consequências

### Positivas

- Consultas parametrizadas reduzem o risco de SQL injection.
- A conexão fica reutilizável e fácil de testar.
- A arquitetura preserva o aprendizado de SQL.

### Negativas

- Consultas e mapeamentos precisam ser escritos manualmente.
- Migrações e validações de esquema ainda precisam ser definidas em uma etapa futura.

## Implementação atual

- Banco: PostgreSQL.
- Cliente: `pg`.
- Conexão: `src/database/connection.js`.
- Uso: serviços em `src/modules/**`.
