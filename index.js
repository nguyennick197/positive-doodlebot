require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client, Intents, MessageEmbed } = require('discord.js');
const { helpFields } = require('./utils/constants.js');
const { sendRandomDoodle } = require('./commands/sendRandomDoodle.js');
const { sendTags } = require('./commands/sendTags.js');
const { sendHelp } = require('./commands/sendHelp.js');
const { searchDoodles } = require('./commands/searchDoodles.js');
const { transcribeImage } = require('./commands/transcribeImage');

const app = express();
app.use(cors());

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = {
	prefix: "d!"
}

client.login(process.env.CLIENT_TOKEN);

client.on('ready', () => {
	console.log(`Ready! Logged in as ${client.user.tag}!`);
});

client.on('guildCreate', (g) => {
	const channel = g.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(g.me).has('SEND_MESSAGES'));
	const embed = new MessageEmbed()
		.setTitle(":purple_heart:  Thanks for inviting me! :purple_heart:")
		.setDescription("Here are some commonly used commands and questions to get you started:")
		.addFields(helpFields);
	channel.send({ embeds: [embed] });
})

client.on('messageCreate', async (msg) => {
	if (msg.author.bot) return;
	if (msg.content.indexOf(config.prefix) !== 0) return;

	const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

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