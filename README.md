# MiBandaBot

Just run this command to have everything running in your device:

```shell
docker-compose up
```

Also, a `.env` file is needed with following content:
```
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/postgres?schema=public"
BOT_TOKEN=<bot_token>
```