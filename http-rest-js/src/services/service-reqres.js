/**
 * Using reqres.in(hosted api) for initial tests
 */
const axios = require('axios');
const URL = 'https://reqres.in/api';

/**
 * Make a HTTP GET request in API
 * @param {string} id - id to search in API
 * @returns {Object} - founded user
 */
async function getReqRes(id) {
    const url = `${URL}/users/${id}`;
    const response = await axios.get(url);
    return response.data;
}

/**
 * Make a HTTP POST request in API 
 * @param {string} user - user to save in database
 * @return {Object} - server response 
 */
async function postReqRes(user) {
    const url = `${URL}/users`;
    const response = await axios.post(url, user);
    return response;
}

/**
 * Make a HTTP PUT request in API
 * @param {string} userUpdated - user to update in database
 * @return {Object} - server response
 */
async function putReqRes(userUpdated) {

    const url = `${URL}/users/2`;
    const response = await axios.put(url, userUpdated);
    return response;
}

/**
 * Make a HTTP DELETE request in api
 * @return {Object} - server response
 */
async function deleteReqRes() {

    const url = `${URL}/users/2`;
    const response = await axios.delete(url);
    return response;
}

module.exports = {
    postReqRes,
    getReqRes,
    putReqRes,
    deleteReqRes
};