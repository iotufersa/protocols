/**
 * Using reqres.in(hosted api) for initial tests
 */
const axios = require('axios');

async function getReqRes() {
    const url = 'https://reqres.in/api/users';
    const response = await axios.get(url);
    return response.data;
}

getReqRes()
    .then(users => users.data.map(people => `${people.first_name} ${people.last_name}`))
    .then(usersByName => console.log(usersByName))
    .catch(error => console.error('deu ruim ai: ',error));