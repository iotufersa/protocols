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

// Use service-swapi to exemplify GET HTTP
async function getHttp(name) {
    const response = await swapi.getCharactersByName(name);
    console.log('Response: \n', response);
}

// Use service-reqres to exemplify POST HTTP
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

async function putHttp(userUpdated) {
    response = await reqRes.putReqRes(userUpdated);
    console.log(`
            Request status: ${clc.green(`${response.status}`)}
            Name: ${response.data.name}
            Job: ${response.data.job}
            Updated at: ${clc.green(`${response.data.updatedAt}`)}
            `);
}

async function deleteHttp(answer) {
    if(answer.answer){
        const response = await reqRes.deleteReqRes();
        console.log(response)
    }
    else     
        console.log('User not deleted')
}