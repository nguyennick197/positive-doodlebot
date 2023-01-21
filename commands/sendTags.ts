import { Message, MessageEmbed } from "discord.js";
import { tagExamples } from "../utils/constants";

export function sendTags(msg: Message) {
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