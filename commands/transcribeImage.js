const { getRandomDoodle } = require('../utils/requests.js');

async function transcribeImage(msg, client) {
    const lastMessage = msg.channel.messages.cache.filter(m => m.author.id === client.user.id && m.attachments.size).last();
    if (!lastMessage) {
        let errorMessage = "Sorry, I can't find the last image sent. Try using d!doodle before using d!text.";
        msg.channel.send({ content: errorMessage })
        return;
    }
    const discordUrl = lastMessage.attachments.first().url;
    const parts = discordUrl.split("/");
    const fileName = parts[parts.length - 1];
    const doodle = await getRandomDoodle({ fileName });
    msg.channel.send({ content: doodle.image_text });
}

module.exports = {
    transcribeImage
}