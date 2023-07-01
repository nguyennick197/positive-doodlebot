import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Client, Intents, Collection } from "discord.js";
import { sendRandomDoodle } from "./commands/sendRandomDoodle";
import { sendTags } from "./commands/sendTags";
import { sendHelp } from "./commands/sendHelp";
import { searchDoodles } from "./commands/searchDoodles";
import { sendOnJoinMessage } from "./commands/sendOnJoinMessage";
import { addDailyAnalytics } from "./utils/analytics";
import { transcribeImage } from "./commands/transcribeImage";

dotenv.config();
const app = express();
app.use(cors());

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const commands = [
  {
    name: "doodle",
    description: "Send a random doodle",
    options: [
      {
        name: "tag",
        description: "Doodle tag",
        type: "STRING",
        required: false,
      },
    ],
  },
  {
    name: "tags",
    description: "Send commonly used tags",
  },
  {
    name: "help",
    description: "Get help about how to use the doodle bot",
  },
  {
    name: "search",
    description: "Search for a doodle",
    options: [
      {
        name: "query",
        description: "Search query",
        type: "STRING",
        required: true,
      },
    ],
  },
  {
    name: "transcribe",
    description: "Get the text for the last image sent",
  },
];

const main = () => {
  try {
    client.login(process.env.CLIENT_TOKEN);

    client.once("ready", async () => {
      if (client && client.user) {
        console.log(`Ready! Logged in as ${client.user.tag}!`);

        try {
          const commandsManager = new Collection();
          const registeredCommandNames = new Set();

          // Create slash commands globally
          for (const command of commands) {
            const { name } = command;
            if (registeredCommandNames.has(name)) {
              console.warn(`Duplicate command: ${name}`);
              continue;
            }
            registeredCommandNames.add(name);

            const slashCommand = await client.application?.commands.create(
              command as any
            );
            commandsManager.set(slashCommand?.id, command);
          }

          // Remove existing global slash commands not in the commands array
          const existingCommands = await client.application?.commands.fetch();
          for (const existingCommand of existingCommands?.values() || []) {
            if (!commandsManager.has(existingCommand.id)) {
              await existingCommand.delete();
            }
          }

          console.log("Slash commands registered successfully!");
        } catch (error) {
          console.error("Failed to register slash commands:", error);
        }
        // send daily analytics
        setInterval(async () => {
          addDailyAnalytics(client);
        }, 86400000); // interval in milliseconds (1 day)
      }
    });

    client.on("guildCreate", (guild) => {
      sendOnJoinMessage(guild);
    });

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      const { commandName, options } = interaction;

      if (commandName === "doodle") {
        const query = options.getString("query");
        await sendRandomDoodle(interaction, query);
      } else if (commandName === "tags") {
        await sendTags(interaction);
      } else if (commandName === "help") {
        await sendHelp(interaction);
      } else if (commandName === "search") {
        const query = options.getString("query");
        await searchDoodles(interaction, query);
      } else if (commandName === "transcribe") {
        await transcribeImage(interaction, client);
      }
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
