require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client, Intents, MessageAttachment, MessageEmbed } = require('discord.js');
const { getRandomDoodle } = require('./utils/requests.js');
const { helpFields, tagExamples } = require('./utils/constants.js');

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
		if (command === "doodle") {
			let tag;
			if (args && args[0]) {
				tag = args[0]
			}
			const randomDoodle = await getRandomDoodle({ tag });
			if (!randomDoodle) {
				let errorMessage = "Sorry, there are no images for that tag. Use d!tags to view some popular tags."
				msg.channel.send({ content: errorMessage })
				return;
			}
			const file = new MessageAttachment(randomDoodle.url);
			msg.channel.send({ files: [file] })
		}

		if (command === "tags") {
			const fields = tagExamples.map(tag => {
				return {
					name: tag,
					value: "\u200b",
					inline: true
				}
			})
			const embed = new MessageEmbed()
				.setTitle(':dog:  Tags  :cat: ')
				.setDescription("Here are some popular tags you can use with the !doodle command")
				.addFields(fields);
			msg.channel.send({ embeds: [embed] })
		}

		if (command == "help") {
			const embed = new MessageEmbed()
				.setTitle(":purple_heart:  Help  :purple_heart:")
				.setDescription("Commonly used commands and questions")
				.addFields(helpFields);
			msg.channel.send({ embeds: [embed] })
		}

		if (command == "search") {
			let searchString = args.join(" ");
			if (!searchString) {
				let errorMessage = "Sorry, you must use this command with a search term. Try d!search cute"
				msg.channel.send({ content: errorMessage })
				return;
			}
			const randomDoodle = await getRandomDoodle({ searchString });
			if (!randomDoodle) {
				let errorMessage = "Sorry, there are no images available that match your search."
				msg.channel.send({ content: errorMessage })
				return;
			}
			const file = new MessageAttachment(randomDoodle.url);
			msg.channel.send({ files: [file] });
		}
	} catch (err) {
		console.log(err);
	}
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});