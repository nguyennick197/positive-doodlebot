import { Message, MessageEmbed, TextChannel } from "discord.js";
import { helpFields } from "../utils/constants";

export function sendHelp(msg: Message) {
    const embed = new MessageEmbed()
        .setTitle(":purple_heart:  Help  :purple_heart:")
        .setDescription("Commonly used commands and questions")
        .addFields(helpFields);
    (msg.channel as TextChannel).send({ embeds: [embed] })
}