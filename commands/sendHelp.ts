import { CommandInteraction, Message, MessageEmbed } from "discord.js";
import { helpFields } from "../utils/constants";

export async function sendHelp(interactionOrMsg: CommandInteraction | Message) {
  const embed = new MessageEmbed()
    .setTitle(":purple_heart:  Help  :purple_heart:")
    .setDescription("Commonly used commands and questions")
    .addFields(helpFields);

  if (interactionOrMsg instanceof CommandInteraction) {
    await interactionOrMsg.reply({ embeds: [embed] });
  } else {
    await interactionOrMsg.channel.send({ embeds: [embed] });
  }
}
