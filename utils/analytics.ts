import { Client, CommandInteraction } from "discord.js";
import { supabase } from "../supabase";
import { AnalyticsObject } from "./types";

const dailyAnalytics: AnalyticsObject = {
  message_count: 0,
  commands: {
    doodle: 0,
    help: 0,
    search: 0,
    transcribe: 0,
    tags: 0,
  },
  args: {},
};

export async function incrementAnalytics(interaction: CommandInteraction) {
  const { commandName, options } = interaction;

  let args: string[] = [];

  const tags = options.getString("tag");
  const query = options.getString("query");

  if (tags) {
    args = [...args, ...tags.split(" ")];
  }

  if (query) {
    args = [...args, ...query.split(" ")];
  }

  dailyAnalytics.message_count += 1;
  if (!dailyAnalytics.commands[commandName])
    dailyAnalytics.commands[commandName] = 0;
  dailyAnalytics.commands[commandName] += 1;
  if (args) {
    args.forEach((arg) => {
      if (!dailyAnalytics.args[arg]) dailyAnalytics.args[arg] = 0;
      dailyAnalytics.args[arg] += 1;
    });
  }
}

export async function addDailyAnalytics(client: Client) {
  const date = new Date();
  const { message_count, commands, args } = dailyAnalytics;
  console.log("Sending daily analytics: ", date, message_count);
  try {
    const server_count = client?.guilds?.cache?.size;
    await supabase.from("doodlebot_analytics").insert({
      date,
      message_count,
      commands,
      args,
      server_count,
    });
  } catch (error) {
    console.error(`Error inserting analytics: ${error}`);
  }
  resetAnalytics();
}

function resetAnalytics() {
  dailyAnalytics.message_count = 0;
  (dailyAnalytics.commands = {
    doodle: 0,
    help: 0,
    search: 0,
    transcribe: 0,
    tags: 0,
  }),
    (dailyAnalytics.args = {});
}
