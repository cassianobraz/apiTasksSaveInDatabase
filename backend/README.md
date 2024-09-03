# Desafio backend node

<p align="left">Nesse desafio você desenvolverá uma API para realizar o CRUD de suas *tasks* (tarefas).

A API deve conter as seguintes funcionalidades:</p>

- Criação de uma task
- Listagem de todas as tasks
- Atualização de uma task pelo id
- Remover uma task pelo id
- Marcar pelo id uma task como completa 
- E o verdadeiro desafio: Importação de tasks em massa por um arquivo CSV

## Estrutura do Projeto

```
├───controller
│   ├── CsvController.ts
│   └── TasksController.ts
├───routes
│   ├── csvRoutes.ts
│   ├── index.ts
│   └── tasksRoutes.ts
└───server.ts
```

## Rotas e regras de negócio

### POST `/tasks`

<p align="left">Criar uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.

Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` devem ser preenchidos automaticamente, conforme a orientação das propriedades acima.</p>

### GET `/tasks`

<p align="left">Deve ser possível listar todas as tasks salvas no banco de dados.

Também é possível realizar uma busca, filtrando as tasks pelo `title` e `description`</p>

### PUT `/tasks/:id`

<p align="left">Deve ser possível atualizar uma task pelo `id`.

No `body` da requisição, deve receber somente o `title` e/ou `description` para serem atualizados.

Se for enviado somente o `title`, significa que o `description` não pode ser atualizado e vice-versa.

Antes de realizar a atualização, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.</p>

### DELETE `/tasks/:id`

<p align="left">Deve ser possível remover uma task pelo `id`.

Antes de realizar a remoção, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.</p>

### PATCH `/tasks/:id/complete`

<p align="left">Deve ser possível marcar a task como completa ou não. Isso significa que se a task estiver concluída, deve voltar ao seu estado “normal”.

Antes da alteração, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.</p>

### POST `multipart/form-data`

<p align="left">Normalmente em uma API, a importação de um CSV acontece enviando o arquivo pela rota, por meio de outro formato, chamado multipart/form-data.</p>

# Instalação

<p align="left">Clone o repositório e instale as dependências:</p>

```
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_DIRETORIO>
pnpm install
```

## Uso

Inicie o servidor:
```
pnpm start
```
O servidor estará disponível em `http://localhost:3333`.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).