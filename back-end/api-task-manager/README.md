
# API de Gerenciamento de Projetos NestJS

Este é um aplicativo de gerenciamento de projetos construído com NestJS. O aplicativo fornece endpoints para gerenciar usuários, projetos, tarefas e tags. A autenticação é tratada usando tokens JWT.

## Funcionalidades

- User: Criar, atualizar, excluir, listar usuários e detalhe.
- Projeto: Criar, atualizar, excluir, listar projetos e detalhes. Adicionar membros aos projetos e remover membros aos projetos.
- Tarefas: Criar, atualizar, excluir, listar tarefas e detalhe. Adicionar responsáveis às tarefas.
- Tags: Criar, atualizar, excluir, listar tags e detalhe.
- Registro de Logs: Logs são salvos no diretório de logs. erros são registrados.

## Rodando a Aplicação

Para rodar a aplicação, você precisa do Docker e Docker Compose instalados na sua máquina. Siga os passos abaixo:

1. Inicie a aplicação usando o Docker Compose:

```
docker-compose up --build
```

2. Rodar o seed.ts e ter dados necessarios para o funcionamento do front-end
- rodar os seguintes comandos dentro do container da api

```
docker exec -it <container_id_or_name> /bin/bash
```
```
npx ts-node ./src/seed.ts
```

2. Acesse a aplicação: A aplicação estará acessível em: ```http://localhost:3000```.

## Documentação da API

A documentação para os endpoints pode ser encontrada em ```http://localhost:3000/docs```.