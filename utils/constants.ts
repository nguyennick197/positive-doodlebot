export const helpFields = [
  {
    name: "/doodle",
    value: "Sends a random positive doodle!",
  },
  {
    name: "/doodle [tag] ie: /doodle cat",
    value: "Sends a positive doodle with an image from that tag!",
  },
  {
    name: "/doodle-tags",
    value: "Sends a list of popular tags!",
  },
  {
    name: "/doodle-search [search string] ie: /doodle-search school studies",
    value:
      "Sends a positive doodle with text or tags that matches any word in your search string! (You can use 1 or more words)",
  },
  {
    name: "/doodle-text",
    value:
      "Sends the text from the last image sent by Positive Doodlebot in this channel!",
  },
  {
    name: "/doodle-help",
    value: "Use this if you ever need help using this bot!",
  },
  {
    name: "Who created this art?",
    value:
      "All of this art is drawn by Emm Roy! You can follow them at https://www.patreon.com/emmnotemma.",
  },
  {
    name: "Who created this bot?",
    value:
      "This bot was created by https://github.com/nguyennick197. You can find the source code at https://github.com/nguyennick197/positive-doodlebot.",
  },
];

export const tagExamples = [
  "cat",
  "bird",
  "ghost",
  "penguin",
  "fish",
  "dog",
  "jellyfish",
  "coffee",
  "food",
  "snail",
  "turtle",
  "elephant",
  "plant",
  "bee",
  "bunny",
  "pig",
  "fox",
  "tea",
  "whale",
  "chicken",
  "unicorn",
  "robot",
  "shark",
  "dragon",
];

export const commands = [
  {
    name: "doodle",
    description: "Send a random doodle",
    options: [
      {
        name: "tag",
        description: "Doodle tag",
        type: "STRING",
        required: false,
      },
    ],
  },
  {
    name: "doodle-tags",
    description: "Send commonly used tags",
  },
  {
    name: "doodle-help",
    description: "Get help about how to use the doodle bot",
  },
  {
    name: "doodle-search",
    description: "Search for a doodle",
    options: [
      {
        name: "query",
        description: "Search query",
        type: "STRING",
        required: true,
      },
    ],
  },
  {
    name: "doodle-text",
    description: "Get the text for the last image sent",
  },
];
