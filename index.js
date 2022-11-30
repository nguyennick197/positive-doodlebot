require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(process.env.CLIENT_TOKEN);

