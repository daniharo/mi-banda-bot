# MiBandaBot

## Installation

Just run this command to have everything running in your device:

```shell
docker-compose up
```

Also, a `.env` file is needed with following content:

```
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/postgres?schema=public"
BOT_TOKEN=<bot_token>
```

## Stack

Following stack is used for this project:

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.dev/) 16
- [PostgreSQL](https://www.postgresql.org/) 14.1
- [Prisma](https://www.prisma.io/) (Typescript ORM)
- [grammY](https://grammy.dev/) (bot framework for Node)
