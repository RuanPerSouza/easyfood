# ADR-001 — Armazenar restaurantes em memória

> Esta decisão foi mantida como registro histórico. O EasyFood atualmente utiliza PostgreSQL, conforme a ADR-002.

**Status:** Substituída por ADR-002  
**Data:** 20/08/2026  
**Responsável:** Felipe Padrinho — Arquiteto de Software, FECAF

---

## Contexto

A primeira versão da API do **EasyFood** precisa disponibilizar uma lista de restaurantes para consulta e permitir o cadastro de novos restaurantes.

O produto encontra-se em fase de **prototipação, testes e validação**. Neste momento, a prioridade é validar o fluxo da aplicação e preparar uma demonstração para investidores de forma rápida e simples.

Por esse motivo, é necessário escolher uma solução de armazenamento adequada para esta fase inicial do projeto.

---

## Alternativas consideradas

1. Array em memória
2. PostgreSQL
3. MongoDB
4. SQLite
5. Firebase
6. Arquivo JSON

---

## Decisão

Adotar um **array em memória** como mecanismo de armazenamento dos restaurantes na versão inicial da API.

---

## Justificativa

A utilização de um array em memória foi escolhida porque:

- Permite maior rapidez no desenvolvimento e nos testes da API.
- Possui baixa complexidade de implementação.
- Não exige configuração de banco de dados.
- Não possui custo adicional de infraestrutura.
- É suficiente para demonstrar e validar o funcionamento inicial do sistema.

Como o objetivo atual é validar o conceito do produto, a persistência definitiva dos dados ainda não é uma necessidade.

---

## Consequências

### Positivas

- Desenvolvimento e testes mais rápidos.
- Menor complexidade técnica.
- Facilidade para alterar os dados durante a prototipação.
- Permite validar rapidamente o conceito de negócio.
- Não exige infraestrutura adicional.

### Negativas

- Os dados são perdidos quando a aplicação é reiniciada.
- Não existe persistência entre execuções ou deploys.
- Não é adequado para ambientes de produção.
- Não oferece mecanismos robustos de consulta e análise de dados.
- Não possui integridade referencial.
- Pode apresentar limitações conforme o volume de dados aumenta.
- Não é adequado para múltiplas instâncias da aplicação compartilhando os mesmos dados.

---

## Critérios de revisão

Esta decisão deverá ser reavaliada quando:

1. O MVP for validado e houver decisão de levar o sistema para produção.
2. Houver necessidade de persistência dos dados entre execuções ou deploys.
3. O volume de dados ultrapassar o que é razoável manter em memória.
4. For necessário realizar consultas mais complexas.
5. Surgirem relacionamentos entre diferentes entidades do sistema.
6. A aplicação precisar funcionar com múltiplas instâncias ou usuários simultâneos.

---

## Notas do desenvolvedor

O armazenamento em memória é uma solução **temporária**, utilizada exclusivamente para facilitar a prototipação e validação inicial do EasyFood.

A escolha de um mecanismo de persistência definitivo deverá ser registrada em um novo ADR quando os requisitos da próxima etapa do projeto forem definidos.