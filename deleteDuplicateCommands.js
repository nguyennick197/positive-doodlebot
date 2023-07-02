const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const clientId = process.env.APPLICATION_ID;

const rest = new REST({ version: "9" }).setToken(process.env.CLIENT_TOKEN);

(async () => {
  try {
    // Get the list of existing commands
    const commands = await rest.get(Routes.applicationCommands(clientId));
    console.log(commands);
    // Filter out commands to retain only duplicates
    const seen = new Set();
    const duplicateCommands = commands.filter((command) => {
      if (seen.has(command.name)) {
        return true;
      } else {
        seen.add(command.name);
        return false;
      }
    });

    // Delete duplicate commands
    for (const command of duplicateCommands) {
      await rest.delete(Routes.applicationCommand(clientId, command.id));
    }

    console.log("Successfully deleted duplicate (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
