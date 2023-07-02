const { REST } = require("@discordjs/rest");
const {
  Routes,
  ApplicationCommandOptionType,
} = require("discord-api-types/v9");
require("dotenv").config();

const commands = [
  {
    name: "doodle",
    description: "Send a random doodle",
    options: [
      {
        name: "tag",
        description: "Doodle tag",
        type: ApplicationCommandOptionType.String,
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
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "doodle-text",
    description: "Get the text for the last image sent",
  },
];

const clientId = process.env.APPLICATION_ID;

const rest = new REST({ version: "9" }).setToken(process.env.CLIENT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
