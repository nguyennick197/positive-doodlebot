const { Client } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const rest = new REST({ version: "9" }).setToken(process.env.CLIENT_TOKEN);

// Create a new client instance
const client = new Client({ intents: [] });

// When the client is ready, start processing
client.once("ready", async () => {
  console.log("Ready!");

  // Get the list of guilds the bot is in
  const guilds = client.guilds.cache.map((guild) => guild.id);

  for (const guildId of guilds) {
    try {
      // Get the list of commands in the guild
      const commands = await rest.get(
        Routes.applicationGuildCommands(process.env.APPLICATION_ID, guildId)
      );

      // Delete each command in the guild
      for (const command of commands) {
        await rest.delete(
          Routes.applicationGuildCommand(
            process.env.APPLICATION_ID,
            guildId,
            command.id
          )
        );
        console.log(`Deleted command ${command.name} in guild ${guildId}`);
      }
    } catch (error) {
      console.error(`Failed to delete commands in guild ${guildId}:`, error);
    }
  }

  // After all commands are deleted, destroy the client
  client.destroy();
});

// Login to Discord with your app's token
client.login(process.env.CLIENT_TOKEN);
