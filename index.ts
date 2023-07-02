import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Client, Intents } from "discord.js";
import { sendRandomDoodle } from "./commands/sendRandomDoodle";
import { sendTags } from "./commands/sendTags";
import { sendHelp } from "./commands/sendHelp";
import { searchDoodles } from "./commands/searchDoodles";
import { sendOnJoinMessage } from "./commands/sendOnJoinMessage";
import { addDailyAnalytics } from "./utils/analytics";
import { transcribeImage } from "./commands/transcribeImage";
import { incrementAnalytics } from "./utils/analytics";

dotenv.config();
const app = express();
app.use(cors());

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const main = () => {
  try {
    client.login(process.env.CLIENT_TOKEN);

    client.once("ready", async () => {
      if (client && client.user) {
        console.log(`Ready! Logged in as ${client.user.tag}!`);

        // send daily analytics
        setInterval(async () => {
          addDailyAnalytics(client);
        }, 86400000); // interval in milliseconds (1 day)
      }
    });

    client.on("guildCreate", async (guild) => {
      sendOnJoinMessage(guild);
    });

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      const { commandName, options } = interaction;

      if (commandName === "doodle") {
        const query = options.getString("tag");
        await sendRandomDoodle(interaction, query);
      } else if (commandName === "doodle-tags") {
        await sendTags(interaction);
      } else if (commandName === "doodle-help") {
        await sendHelp(interaction);
      } else if (commandName === "doodle-search") {
        const query = options.getString("query");
        await searchDoodles(interaction, query);
      } else if (commandName === "doodle-text") {
        await transcribeImage(interaction, client);
      }
      incrementAnalytics(interaction);
    });

    const port = process.env.PORT || 8000;

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

main();
