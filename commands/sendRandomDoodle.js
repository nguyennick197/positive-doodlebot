const { MessageAttachment } = require('discord.js');
const { getRandomDoodle } = require('../utils/requests.js');

async function sendRandomDoodle(msg, args){
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
    msg.channel.send({ files: [file] });
}

module.exports = {
    sendRandomDoodle
}