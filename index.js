require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client, Intents, MessageAttachment, MessageEmbed } = require('discord.js');
const { getRandomDoodle, getCategories } = require('./utils/requests.js');

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

client.on('messageCreate', async (msg) => {
	if (msg.author.bot) return;
	if (msg.content.indexOf(config.prefix) !== 0) return;
	
	const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === "doodle"){
		let category;
		if(args && args[0]){
			category = args[0]
		}
		const randomDoodle = await getRandomDoodle(category);
		const file = new MessageAttachment(randomDoodle.url);
		msg.channel.send({ files: [file] })
	}

	if (command === "categories"){
		const categories = await getCategories();
		const fields = categories.map(catObj => {
			return {
				name: catObj.category,
				value: "Images: " + catObj.count,
				inline: true
			}
		})
		const embed = new MessageEmbed().addFields(fields);
		msg.channel.send({ embeds: [embed] })
	}

	if (command == "faq"){

	}
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});