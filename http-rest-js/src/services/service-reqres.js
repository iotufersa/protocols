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

async function postReqRes(user) {
    const url = `${URL}/users`;
    const response = await axios.post(url, user);
    return response;
}

module.exports = {
    postReqRes,
    getReqRes
};