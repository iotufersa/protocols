/* eslint-disable no-console */
const Commander = require('commander');
const {
    prompt
} = require('inquirer');
const clc = require('cli-color');
const coap = require('coap');

const getQuestion = [{
    type: 'input',
    url: 'url',
    message: 'URL to get: '
}];


Commander
    .version('v0.1.0')
    .description('CLI to test CoAp protocol');


function main() {
    Commander
        .command('get')
        .alis('g')
        .description('CoAp method GET')
        .action(() => {
            prompt(getQuestion).then(answer => getCoap(answer.url));
        })
}

function getCoap(url) {
    if( url ) {
        console.log(clc.yellow('Make a GET request...'));
        const req = coap.request(url); // init the request
        req.on('response', (res) => {
            
            if( res.code === '2.05' ) {
                console.log(clc.green('Request with success code: ' + res.code));
            }
            
            res.pipe(process.stdout);
            res.on('end', () => {
                process.exit(0);
            });
        });
        
        req.end(); // requisition completed
    }
    else 
        console.log(clc.red('Empty url!'));
    
}

coapRequest(process.argv[2], process.argv[3]);