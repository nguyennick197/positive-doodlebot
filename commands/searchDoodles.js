const { MessageAttachment } = require('discord.js');
const { getRandomDoodle } = require('../utils/requests.js');

async function searchDoodles(msg, args) {
    let searchString = args.join(" ");
    if (!searchString) {
        let errorMessage = "Sorry, you must use this command with a search term. Try d!search cute";
        msg.channel.send({ content: errorMessage });
        return;
    }
    const randomDoodle = await getRandomDoodle({ searchString });
    if (!randomDoodle) {
        let errorMessage = "Sorry, there are no images available that match your search.";
        msg.channel.send({ content: errorMessage });
        return;
    }
    const file = new MessageAttachment(randomDoodle.url);
    msg.channel.send({ files: [file] });
}

module.exports = {
    searchDoodles
}