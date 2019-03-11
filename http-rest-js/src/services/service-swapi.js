/**
 * Using swapi.co(Star Wars API) for initial tests
 */

const axios = require('axios');
const URL = 'https://swapi.co/api/people';

// Returns only the names found in the API 
async function getCharactersByName(nome) {
    const url = `${URL}/?search=${nome}&format=json`;
    const response = await axios.get(url);
    return response.data.results.map(character =>  character.name);
}

module.exports = {
    getCharactersByName
};