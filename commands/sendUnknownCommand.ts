import { Message } from "discord.js";

export function sendUnknownCommand(msg: Message) {
  const message =
    "Sorry, that command does not exist. You can use /help to view all available commands.";
  msg.channel.send({ content: message });
}
