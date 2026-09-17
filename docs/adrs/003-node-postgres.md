# ADR-003 — Node-postgres como conexão ao banco de dados PostgreSQL

**Status:** Substituída por ADR-004

**Data:** 03/09/2026

## Contexto

O projeto **EasyFood** necessita de uma forma de comunicação entre o backend desenvolvido em **Node.js** e o banco de dados **PostgreSQL**.

Foi necessário escolher uma biblioteca para realizar essa comunicação. Entre as opções consideradas estão o **Node-postgres (`pg`)**, que permite executar comandos SQL diretamente, e ferramentas de maior abstração, como ORMs.

Como o projeto possui como objetivo também o aprendizado e utilização de **SQL e PostgreSQL**, foi necessário escolher uma solução que permitisse maior controle sobre as consultas realizadas no banco de dados.

## Decisão

Foi decidido utilizar o **Node-postgres (`pg`)** como biblioteca de conexão entre o backend Node.js e o banco de dados PostgreSQL.

A biblioteca será responsável por estabelecer e gerenciar as conexões com o banco e permitir que o backend execute comandos SQL.

A conexão será realizada utilizando um **Pool**, conforme o exemplo:

```javascript
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "easyfood",
    password: "SUA_SENHA",
    port: 5432
});
```

As consultas ao banco serão realizadas através do `pool.query()`:

```javascript
const resultado = await pool.query(
    "SELECT * FROM restaurantes"
);
```

## Justificativa

O `pg` foi escolhido pelos seguintes motivos:

* Integração direta com Node.js.
* Suporte nativo ao PostgreSQL.
* Permite utilizar SQL diretamente.
* É simples de configurar e utilizar.
* Possui suporte a **Connection Pooling**.
* Permite maior controle sobre as consultas realizadas.
* Facilita o aprendizado de SQL e PostgreSQL.
* Evita adicionar uma camada de abstração desnecessária para o escopo atual do projeto.
* É suficiente para as necessidades atuais do EasyFood.

## Alternativas consideradas

### Prisma

O **Prisma** foi considerado como alternativa por oferecer uma camada de abstração sobre o banco de dados e facilitar algumas operações através de um ORM.

Porém, foi decidido não utilizá-lo neste momento, pois o projeto tem como objetivo trabalhar diretamente com SQL e compreender melhor a comunicação entre a aplicação e o banco de dados.

### Node-postgres (`pg`)

Foi escolhido por permitir que o backend execute SQL diretamente no PostgreSQL, mantendo a implementação simples e adequada ao escopo do projeto.

## Consequências

### Positivas

* Maior controle sobre as consultas SQL.
* Melhor compreensão do funcionamento do PostgreSQL.
* Arquitetura simples.
* Menor quantidade de dependências.
* Fácil integração com o backend existente.
* Utilização de Pool para gerenciamento das conexões.

### Negativas

* As consultas SQL precisam ser escritas manualmente.
* Algumas operações podem exigir mais código do que utilizando um ORM.
* O desenvolvedor precisa ter conhecimento de SQL.
* Validações e regras relacionadas ao banco precisam ser tratadas pela aplicação e/ou pelo próprio PostgreSQL.

## Implementação

A dependência foi adicionada ao projeto através do npm:

```bash
npm install pg
```

A conexão com o banco foi centralizada no arquivo:

```text
backend/
├── server.js
├── db.js
└── ...
```

O arquivo `db.js` é responsável pela configuração da conexão:

```javascript
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "easyfood",
    password: "SUA_SENHA",
    port: 5432
});

module.exports = pool;
```

O `server.js` importa essa conexão:

```javascript
const pool = require("./db");
```

Dessa forma, as rotas da API podem utilizar o PostgreSQL através do `pool.query()`.

---

### Resumo da decisão

> **O EasyFood utilizará Node-postgres (`pg`) para realizar a comunicação entre o backend Node.js e o banco de dados PostgreSQL, priorizando simplicidade, controle das consultas SQL e aprendizado da tecnologia.**
