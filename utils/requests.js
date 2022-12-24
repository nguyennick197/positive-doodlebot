require('dotenv').config();
const fetch = require('node-fetch');

async function getRandomDoodle(category) {
    let url = `${process.env.API_URL}/doodles/random`;
    if (category) url += `?category=${category}`;
    const response = await fetch(url);
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}

async function getCategories() {
    const url = `${process.env.API_URL}/doodles/categories`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

module.exports = {
    getRandomDoodle,
    getCategories
}