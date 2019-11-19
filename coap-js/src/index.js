/* eslint-disable no-console */
const Commander = require('commander');
const clc = require('cli-color');
const coap = require('coap');
const { prompt } = require('inquirer');

const questions = [{
    type: 'input',
    name: 'url',
    message: 'URL to request: '
}];

Commander
    .version('v0.1.0')
    .description('CLI to test CoAp protocol');


function main() {

    try {
        Commander
            .command('get')
            .alias('g')
            .description('CoAp method GET')
            .action(() => {
                prompt(questions).then(answer => coapRequest(answer.url, 'GET'));
            });

        Commander
            .command('post')
            .alias('pt')
            .description('CoAp method POST')
            .action(() => {
                prompt(questions).then(answer => coapRequest(answer.url, 'POST'));
            });
            
        Commander
            .command('put')
            .alias('pt')
            .description('CoAp method PUT')
            .action(() => {
                prompt(questions).then(answer => coapRequest(answer.url, 'PUT'));
            });

        Commander
            .command('delete')
            .alias('d')
            .description('CoAp method DELETE')
            .action(() => {
                prompt(questions).then(answer => coapRequest(answer.url, 'DELETE'));
            });

        Commander.parse(process.argv);
    } catch (error) {
        console.error(error);
    }

   

}
main();

/**
 * 
 * @param {string} url - url to use the request method 
 * @param {string} coapMethod - method to request
 * 
 */
function coapRequest(url, coapMethod) {
    const reqOptions = {
        host: 'localhost',
        port: 5683,
        pathname: url,
        method: coapMethod
    };

    if ( reqOptions.pathname ) {
        console.log(clc.yellow('Make a ' + coapMethod + ' request...'));
        
        const req = coap.request(reqOptions); // init the request
        req.on('response', (res) => {

            if (res.code === '2.05') {
                console.log(clc.green('Request with success code: ' + res.code));
            }

            res.pipe(process.stdout);
            res.on('end', () => {
                process.exit(0);
            });
        });

        req.end(); // requisition completed
    } else
        throw new Error('Empty url!');

}