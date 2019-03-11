/**
 * Using reqres.in(hosted api) for initial tests
 */
const axios = require('axios');
const URL = 'https://reqres.in/api';

async function getReqRes(id) {
    const url = `${URL}/users/${id}`;
    const response = await axios.get(url);
    return response.data;
}

async function postReqRes() {
    const url = `${URL}/users`;
    const response = await axios.post(url, {
        name: 'Arthur',
        job: 'Estudante'
    });
    return response;
}

postReqRes()
    .then(response => {
        console.log(`
        Status da requisição: ${response.status}
        Name: ${response.data.name}
        Job: ${response.data.job}
        Id: ${response.data.id}`);
    });


// getReqRes()
//     .then(users => users.data.map(people => `${people.first_name} ${people.last_name}`))
//     .then(usersByName => console.log(usersByName))
//     .catch(error => console.error('deu ruim ai: ',error));