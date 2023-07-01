import { MessageAttachment, CommandInteraction } from "discord.js";
import { getRandomDoodle } from "../utils/requests";

export async function searchDoodles(
  interaction: CommandInteraction,
  query: string | null
) {
  if (!query) {
    let errorMessage =
      "Sorry, you must use this command with a search term. Try /search cute";
    interaction.reply({ content: errorMessage });
    return;
  }
  const randomDoodle = await getRandomDoodle({ searchString: query });
  if (!randomDoodle) {
    let errorMessage =
      "Sorry, there are no images available that match your search.";
    interaction.reply({ content: errorMessage });
    return;
  }
  const file = new MessageAttachment(randomDoodle.url);
  interaction.reply({ files: [file] });
}
