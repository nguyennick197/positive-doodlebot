const { MessageEmbed } = require('discord.js');
const { helpFields } = require('../utils/constants');

function sendHelp(msg) {
    const embed = new MessageEmbed()
        .setTitle(":purple_heart:  Help  :purple_heart:")
        .setDescription("Commonly used commands and questions")
        .addFields(helpFields);
    msg.channel.send({ embeds: [embed] })
}

module.exports = {
    sendHelp
}