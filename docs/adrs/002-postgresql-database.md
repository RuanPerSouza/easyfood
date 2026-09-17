# ADR-002 - Adotar PostgreSQL como banco de dados

## Status
Aceito

## Data
27-08-2026

## Autores
Equipe de Engenheiros EasyFood

## Contexto

Precisamos persistir os dados da aplicação EasyFood de forma segura, estruturada e confiável. 

A aplicação terá informações como restaurantes, usuários, pedidos e outros dados relacionados ao funcionamento do sistema. Portanto, é necessário utilizar uma solução de armazenamento que permita realizar consultas, relacionamentos entre dados e futuras expansões da aplicação.

Durante a análise, foram consideradas as seguintes alternativas:

## Alternativas

- MySQL
- PostgreSQL
- MongoDB
- SQLite
- Firebase
- Armazenamento dos dados em uma Array

## Decisão

Adotar o **PostgreSQL** como banco de dados da aplicação EasyFood.

## Justificativa

O PostgreSQL foi escolhido por ser um banco de dados relacional robusto, gratuito e de código aberto, oferecendo suporte a relacionamentos, integridade dos dados, consultas SQL e transações.

Além disso, permite que a aplicação evolua sem a necessidade de uma mudança de banco de dados à medida que novos recursos e entidades sejam adicionados.

A utilização de um banco relacional também facilita a organização dos dados do EasyFood, principalmente considerando relacionamentos entre usuários, restaurantes, produtos, pedidos e demais entidades do sistema.

## Consequências

### Positivas

- Maior segurança e consistência dos dados.
- Suporte a relacionamentos entre tabelas.
- Utilização de SQL para consultas.
- Suporte a transações.
- Boa escalabilidade para o crescimento da aplicação.
- Banco de dados gratuito e de código aberto.
- Grande comunidade e ampla documentação.
- Facilita futuras integrações e evoluções do sistema.

### Negativas

- Exige configuração e gerenciamento do banco de dados.
- Possui maior complexidade inicial em comparação com SQLite ou armazenamento em Array.
- A equipe precisa conhecer conceitos de bancos relacionais e SQL.

## Considerações sobre as alternativas

**MySQL:** É uma alternativa válida e possui ampla utilização, porém o PostgreSQL oferece recursos avançados e maior flexibilidade para as necessidades futuras do projeto.

**MongoDB:** Foi descartado por utilizar um modelo não relacional, enquanto o EasyFood possui diversas entidades que apresentam relacionamentos entre si.

**SQLite:** É simples e adequado para aplicações menores, porém não é a melhor opção para uma aplicação que pode crescer e receber múltiplos acessos simultâneos.

**Firebase:** Facilita o desenvolvimento e oferece serviços prontos, mas cria maior dependência de uma plataforma específica e não atende tão bem à necessidade de controle sobre a estrutura do banco.

**Array:** Foi utilizada apenas como solução temporária durante a prototipação. Não oferece persistência adequada, pois os dados são perdidos quando a aplicação é encerrada.

## Resultado esperado

Com a adoção do PostgreSQL, o EasyFood terá uma estrutura de persistência confiável e preparada para a evolução da aplicação, permitindo armazenar, consultar e relacionar os dados de forma organizada.

## Referências

- Documentação oficial do PostgreSQL
- Requisitos e necessidades da aplicação EasyFood