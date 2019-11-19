/**
 * Commander is a lib to help create CLI(Command Line Interfaces)
 * Developed by João Goulart e Arthur Lennon
 */

const Commander = require('commander');
const {
    prompt
} = require('inquirer');
const clc = require('cli-color');
const swapi = require('./services/service-swapi');
const reqRes = require('./services/service-reqres');

const getQuestions = [{
    type: 'input',
    name: 'name',
    message: 'Name to search in API:'
}];

const ptQuestions = [{
    type: 'input',
    name: 'name',
    message: 'Name:'
},
{
    type: 'input',
    name: 'job',
    message: 'Job:'
}
];

const deleteQuestions = [{
    type: 'confirm',
    name: 'answer',
    message: 'Are you sure you want to delete the user?'
}];


Commander
    .version('v0.1.0')
    .description(`CLI to test multi-protocol API's for IoT

${clc.yellow('Inicialmente estou usando as api\'s swapi e reqres para fins de teste')}

Currently supported protocols: ${clc.green(`
    - HTTP ✔️`)}
Future updates:${clc.red(`
    - CoAP ❌
    - MQTT ❌
    - AMQP ❌
    - XMPP ❌`)}`);

/**
 * Main function
 */
async function main() {
    Commander
        .command('get')
        .alias('g')
        .description('HTTP verb GET')
        .action(() => {
            prompt(getQuestions).then(answer => getHttp(answer.name));
        });

    Commander
        .command('post')
        .alias('p')
        .description('HTTP verb POST')
        .action(() => {
            prompt(ptQuestions).then(answers => postHttp(answers));
        });

    Commander
        .command('put')
        .alias('pt')
        .description('HTTP verb PUT')
        .action(() => {
            prompt(ptQuestions).then(answers => putHttp(answers));
        });

    Commander
        .command('delete')
        .alias('d')
        .description('HTTP verb DELETE')
        .action(() => {
            prompt(deleteQuestions).then(answers => deleteHttp(answers));
        });

    Commander.parse(process.argv);

}

main();

/**
 * Async function, use service-swapi to exemplify GET HTTP
 * and show the results
 * @param {string} name - name to get using swapi service
 */
async function getHttp(name) {
    const response = await swapi.getCharactersByName(name);
    const filterResponse = response.filter(character => {
        return character.charAt(0).toLowerCase() === name.charAt(0).toLowerCase();
    });
    console.log('Response: \n', filterResponse);
}

/**
 * Async function, use service-reqres to exemplify POST HTTP
 * and show the results
 * @param {string} user - user to post using reqRes service
 *  */
async function postHttp(user) {
    const response = await reqRes.postReqRes(user);
    console.log(`
            Request status: ${clc.green(`${response.status}`)}
            Name: ${response.data.name}
            Job: ${response.data.job}
            ID: ${response.data.id}
            Created at: ${clc.green(`${response.data.createdAt}`)}
            `);

    // reqRes.postReqRes(user)
    //     .then(response => {
    //         console.log(`
    //         Request status: ${clc.green(`${response.status}`)}
    //         Name: ${response.data.name}
    //         Job: ${response.data.job}
    //         ID: ${response.data.id}
    //         Created at: ${clc.green(`${response.data.createdAt}`)}
    //         `);
    //     })
    //     .catch(error => {
    //         console.error(`
    //         Request status:  ${clc.red(`${error.response.status}`)}
    //         Error:  ${clc.red(`${error.response.data.error}`)}
    //         `);
    //     });
}


/**
 * Async function, use service-reqres to exemplify PUT HTTP
 * and show results
 * @param {string} userUpdated - user to update using reqRes service
 */
async function putHttp(userUpdated) {
    const response = await reqRes.putReqRes(userUpdated);
    console.log(`
            Request status: ${clc.green(`${response.status}`)}
            Name: ${response.data.name}
            Job: ${response.data.job}
            Updated at: ${clc.green(`${response.data.updatedAt}`)}
            `);
}


/**
 * Async function, use service-reqres to exemplify DELETE HTTP
 * and show results.
 * @param {Boolean} answer - user response
 */
async function deleteHttp(answer) {
    if (answer.answer) {
        try {
            const response = await reqRes.deleteReqRes();
            console.log(`
                    Request status: ${clc.green(`${response.status}`)}
                    Usuário deletado com Sucesso
                    `);
        } catch (error) {
            console.error(error);
        }
    } else
        console.log('User not deleted');
}