/**
 * Using swapi.co(Star Wars API) for initial tests
 */

const axios = require('axios');
const URL = 'https://swapi.co/api/people';

// Returns only the names found in the API 
/**
 * Make a HTTP GET request in API
 * @param  {string} name - name to search in API
 * @return {Array} - founded names
 */
async function getCharactersByName(name) {
    const url = `${URL}/?search=${name}&format=json`;
    const response = await axios.get(url);
    return response.data.results.map(character =>  character.name);
}

module.exports = {
    getCharactersByName
};