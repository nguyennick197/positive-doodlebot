const helpFields = [
    {
        name: "d!doodle",
        value: "Sends a random positive doodle!"
    },
    {
        name: "d!doodle [tag] ie: d!doodle cat",
        value: "Sends a positive doodle with an image from that tag!"
    },
    {
        name: "d!tags",
        value: "Sends a list of popular tags!"
    },
    {
        name: "d!search [search string] ie: d!search school studies",
        value: "Sends a positive doodle with text or tags that matches any word in your search string! (You can use 1 or more words)"
    },
    {
        name: "d!transcribe",
        value: "Sends the text from the last image sent by Positive Doodlebot in this channel!"
    },
    {
        name: "d!help",
        value: "Use this if you ever need help using this bot!"
    },
    {
        name: "Who created this art?",
        value: "All of this art is drawn by Emm Roy! You can follow them at https://www.patreon.com/emmnotemma."
    },
    {
        name: "Who created this bot?",
        value: "This bot was created by https://github.com/nguyennick197. You can find the source code at https://github.com/nguyennick197/positive-doodlebot."
    }
];

const tagExamples = [
    "cat", "bird", "ghost", "penguin",
    "fish", "dog", "jellyfish", "coffee",
    "food", "snail", "turtle", "elephant",
    "plant", "bee", "bunny", "pig", "fox",
    "tea", "whale", "chicken", "unicorn",
    "robot", "shark", "dragon"
]

module.exports = {
    helpFields,
    tagExamples
}