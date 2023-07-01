// import { MessageAttachment, Message } from "discord.js";
// import { getRandomDoodle } from "../utils/requests";

// export async function sendRandomDoodle(msg: Message, args: string[]){
//     let tag;
//     if (args && args[0]) {
//         tag = args[0]
//     }
//     const randomDoodle = await getRandomDoodle({ tag });
//     if (!randomDoodle) {
//         let errorMessage = "Sorry, there are no images for that tag. Use d!tags to view some popular tags."
//         msg.channel.send({ content: errorMessage })
//         return;
//     }
//     const file = new MessageAttachment(randomDoodle.url);
//     msg.channel.send({ files: [file] });
// }

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
      "Sorry, there are no images for that tag. Use d!tags to view some popular tags.";

    await interaction.reply({ content: errorMessage });
    return;
  }

  const file = new MessageAttachment(randomDoodle.url);

  await interaction.reply({ files: [file] });
}
