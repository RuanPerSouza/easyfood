# ADR-006 — Configuração por ambiente e frontend servido pelo Express

**Status:** Aceita  
**Data:** 10/09/2026

## Contexto

As credenciais do banco não devem ficar acopladas ao código-fonte, e o frontend precisa ser servido pela mesma aplicação durante o desenvolvimento do MVP.

## Decisão

- Manter a interface em `public/`.
- Servir arquivos estáticos com `express.static`.
- Servir `public/index.html` na rota `/`.
- Manter configurações variáveis (`PORT`, `DB_*`) em variáveis de ambiente.
- Versionar somente `.env.example`; o arquivo `.env` fica ignorado pelo Git.

## Consequências

- O projeto pode ser executado com uma única aplicação na porta `3000`.
- Ambientes diferentes podem usar bancos e portas diferentes sem alteração de código.
- Em produção, as variáveis devem ser fornecidas pelo ambiente de hospedagem ou por um gerenciador de segredos.
