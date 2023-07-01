import { Client, CommandInteraction } from "discord.js";
import { getRandomDoodle } from "../utils/requests";

export async function transcribeImage(
  interaction: CommandInteraction,
  client: Client
) {
  const lastMessage = interaction.channel?.messages.cache
    .filter(
      (m) => (m.author.id === client.user?.id && m.attachments.size) as boolean
    )
    .last();

  if (!lastMessage) {
    const errorMessage =
      "Sorry, I can't find the last image sent. Try using /doodle before using /doodle-text.";
    await interaction.reply({ content: errorMessage });
    return;
  }

  const discordUrl = lastMessage.attachments.first()?.url;

  if (!discordUrl) {
    const errorMessage =
      "Sorry, I can't find the last image sent. Try using /doodle before using /doodle-text.";
    await interaction.reply({ content: errorMessage });
    return;
  }

  const parts = discordUrl.split("/");
  const fileName = parts[parts.length - 1];
  const doodle = await getRandomDoodle({ fileName });
  await interaction.reply({ content: doodle.image_text });
}
