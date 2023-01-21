import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Client, Intents } from "discord.js";
import { sendOnJoinMessage } from "./commands/sendOnJoinMessage";
import { sendRandomDoodle } from "./commands/sendRandomDoodle";
import { sendTags } from "./commands/sendTags";
import { sendHelp } from "./commands/sendHelp";
import { searchDoodles } from "./commands/searchDoodles";
import { transcribeImage } from "./commands/transcribeImage";

dotenv.config();
const app = express();
app.use(cors());

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = {
	prefix: "d!"
}

client.login(process.env.CLIENT_TOKEN);

client.on('ready', () => {
	if (client && client.user) {
		console.log(`Ready! Logged in as ${client.user.tag}!`);
	}
});

client.on('guildCreate', (guild) => {
	sendOnJoinMessage(guild);
})

client.on('messageCreate', async (msg) => {
	if (msg.author.bot) return;
	if (msg.content.indexOf(config.prefix) !== 0) return;

	const args = msg!.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift()!.toLowerCase();

	try {
		if (command === "doodle") sendRandomDoodle(msg, args);
		if (command === "tags") sendTags(msg);
		if (command === "help") sendHelp(msg);
		if (command === "search") searchDoodles(msg, args);
		if (command === "transcribe") transcribeImage(msg, client);
	} catch (err) {
		console.log(err);
	}
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});