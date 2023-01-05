require('dotenv').config();
const fetch = require('node-fetch');

async function getRandomDoodle(tag, searchString) {
    let url = `${process.env.API_URL}/doodles/random`;
    if (tag) url += `?tag=${tag}`;
    if (searchString) url += `?search=${searchString}`;
    const response = await fetch(url);
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}

module.exports = {
    getRandomDoodle,
}