### Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais

---

# Find-A-Friend API

Este é o projeto da API **Find-A-Friend**, uma aplicação desenvolvida para facilitar busca de um novo pet para o seu lar. Este README fornece instruções sobre como clonar, configurar e executar o projeto em sua maquina.

## Requisitos

Certifique-se de ter as seguintes ferramentas instaladas na sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
- [Docker](https://www.docker.com/) (para criar e gerenciar containers)
- [Git](https://git-scm.com/) (para clonar o repositório)

## Instalação

Siga os passos abaixo para configurar o projeto em sua máquina local.

### 1. Clonar o repositório

Primeiro, clone o repositório do projeto usando o Git:

```bash
git clone <URL_DO_REPOSITORIO>
```

Substitua `<URL_DO_REPOSITORIO>` pelo link do repositório.

### 2. Navegar até o diretório do projeto

```bash
cd find-a-friend-api
```

### 3. Instalar as dependências

Instale as dependências do projeto usando o npm:

```bash
npm install
```

### 4. Executando o Docker

Na raiz do projeto, execute o seguinte comando para construir a imagem Docker:

```bash
docker compose up -d
```

### 5. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias. Use o arquivo `.env.example` como referência.

Exemplo de variáveis de ambiente:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
JWT_SECRET="seu_segredo_jwt"
```

### 6. Executar migrações do Prisma

Rode as migrações do Prisma para configurar o banco de dados:

```bash
npx prisma migrate dev
```

### 7. Executar o servidor em ambiente de desenvolvimento

Para iniciar o servidor em ambiente de desenvolvimento, execute:

```bash
npm run dev
```

### 8. Testes

Para rodar os testes unitários, utilize o comando:

```bash
npm run test
```

Para rodar os testes em modo watch, utilize:

```bash
npm run test:watch
```

Para executar os testes end-to-end (E2E), utilize:

```bash
npm run test:e2e
```

### 9. Build

Para gerar a build de produção, utilize o comando:

```bash
npm run build
```

## Tecnologias Utilizadas

- **Fastify**: Framework web para Node.js.
- **Prisma**: ORM para bancos de dados.
- **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática.
- **Vitest**: Framework de testes para aplicações TypeScript.
- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações em containers.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença ISC. Consulte o arquivo LICENSE para mais detalhes.

---

Este `README.md` fornece uma visão geral clara e concisa do projeto, incluindo as etapas necessárias para configurá-lo e executá-lo localmente.
