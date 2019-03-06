/**
 * Using swapi.co(Star Wars API) for initial tests
 */

const axios = require('axios');
const URL = 'https://swapi.co/api/people';

async function getCharactersByName(nome) {
    const url = `${URL}/?search=${nome}&format=json`;
    const response = await axios.get(url);
    return response.data.results;
}

module.exports = {
    getCharactersByName
};