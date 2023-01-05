const helpFields = [
    {
        name: "d!doodle",
        value: "Sends a random positive doodle!"
    },
    {
        name: "d!doodle [category] ie: d!doodle cat",
        value: "Sends a positive doodle with an image from that category!"
    },
    {
        name: "d!categories",
        value: "Here's a list of popular categories!"
    },
    {
        name: "d!search [search string] ie: d!search school studies",
        value: "Sends a positive doodle with text or tags that matches any word in your search string! (You can use 1 or more words)"
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

const tagExamples = ["cat", "bird", "ghost",
    "fish", "dog", "jellyfish", "coffee",
    "food", "snail", "turtle", "elephant",
    "plant", "bee", "bunny", "pig", "fox",
    "tea", "whale", "chicken", "unicorn",
    "robot", "shark", "dragon", "flower",
    "cactus", "giraffe", "owl", "bear",
    "mouse", "hedgehog", "bat", "penguin",
    "sloth", "snake", "narwhal", "koala"]

module.exports = {
    helpFields,
    tagExamples
}