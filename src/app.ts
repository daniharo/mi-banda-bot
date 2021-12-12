import {Bot, Context, session} from "grammy";
import { I18n, I18nContext } from "@grammyjs/i18n";
import dotenv from "dotenv";

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

bot.command("start", (ctx) => ctx.reply(ctx.i18n.t("hey")));
bot.on("message", (ctx) => {
  const message = ctx.message;
  ctx.reply(`${ctx.i18n.t("received")}: ${message.text}`);
  console.log(ctx.message);
});

bot.start();
