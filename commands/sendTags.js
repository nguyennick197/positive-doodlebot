const { MessageEmbed } = require('discord.js');
const { tagExamples } = require('../utils/constants.js');

function sendTags(msg) {
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

module.exports = {
    sendTags
}