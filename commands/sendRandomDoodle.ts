import { MessageAttachment, CommandInteraction } from "discord.js";
import { getRandomDoodle } from "../utils/requests";

export async function sendRandomDoodle(
  interaction: CommandInteraction,
  query: string | null
) {
  let tag;
  if (query) {
    tag = query.split(" ")[0];
  }

  const randomDoodle = await getRandomDoodle({ tag });
  if (!randomDoodle) {
    let errorMessage =
      "Sorry, there are no images for that tag. Use /doodle-tags to view some popular tags.";

    await interaction.reply({ content: errorMessage });
    return;
  }

  const file = new MessageAttachment(randomDoodle.url);

  await interaction.reply({ files: [file] });
}
