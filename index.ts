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
import { incrementAnalytics } from "./utils/analytics";

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
    name: "doodle-tags",
    description: "Send commonly used tags",
  },
  {
    name: "doodle-help",
    description: "Get help about how to use the doodle bot",
  },
  {
    name: "doodle-search",
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
    name: "doodle-text",
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

          // Register slash commands per guild
          for (const guild of client.guilds.cache.values()) {
            const guildCommands = await guild.commands.fetch();

            for (const command of commands) {
              const { name } = command;

              if (registeredCommandNames.has(name)) {
                console.warn(`Duplicate command: ${name}`);
                continue;
              }
              registeredCommandNames.add(name);

              const existingCommand = guildCommands.find(
                (c) => c.name === name
              );

              if (existingCommand) {
                commandsManager.set(existingCommand.id, command);
              } else {
                const slashCommand = await guild.commands.create(
                  command as any
                );
                commandsManager.set(slashCommand.id, command);
              }
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

    client.on("guildCreate", async (guild) => {
      try {
        sendOnJoinMessage(guild);

        const commandsManager = new Collection();
        const registeredCommandNames = new Set();

        for (const command of commands) {
          const { name } = command;

          if (registeredCommandNames.has(name)) {
            console.warn(`Duplicate command: ${name}`);
            continue;
          }
          registeredCommandNames.add(name);

          const slashCommand = await guild.commands.create(command as any);
          commandsManager.set(slashCommand.id, command);
        }

        console.log(
          `Slash commands registered successfully for guild: ${guild.name}`
        );
      } catch (error) {
        console.error(
          `Failed to register slash commands for guild: ${guild.name}`,
          error
        );
      }
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
