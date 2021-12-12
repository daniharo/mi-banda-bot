import {Bot, Context, session} from "grammy";
import { I18n, I18nContext } from "@grammyjs/i18n";
import dotenv from "dotenv";
import prismaClient from "./prisma/PrismaClient";

dotenv.config();

interface InternationalizationContext {
  readonly i18n: I18nContext;
}

type MyContext = Context & InternationalizationContext;

const i18n = new I18n({
  defaultLanguageOnMissing: true, // implies allowMissing = true
  directory: "src/locales",
  useSession: true,
});

const bot = new Bot<MyContext>(process.env.BOT_TOKEN);
bot.use(session());
bot.use(i18n.middleware());

bot.api.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "list", description: "List words" },
  { command: "add", description: "Add a word" },
]);

bot.command("start", (ctx) => ctx.reply(ctx.i18n.t("hey")));

bot.command("list", async (ctx) => {
  const words = await prismaClient.word.findMany();
  const wordList = words.map(word => `- ${word.word}`);
  ctx.reply('Word list:\n' + wordList.join("\n"));
});

bot.command("add", async (ctx) => {
  const word = ctx.match;
  await prismaClient.word.create({
    data: { word }
  })
  ctx.reply(`Created word "${word}"`)
})

bot.on("message", (ctx) => {
  const message = ctx.message;
  ctx.reply(`${ctx.i18n.t("received")}: ${message.text}`);
  console.log(ctx.message);
});

bot.start();
