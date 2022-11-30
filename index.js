require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = {
	prefix: "!"
}

client.login(process.env.CLIENT_TOKEN);

client.on('ready', () => {
	console.log(`Ready! Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
	if (msg.author.bot) return;
	if (msg.content.indexOf(config.prefix) !== 0) return;
	
	const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command !== 'doodle') return;

	msg.reply(`Here is a positive doodle <3`);
});
