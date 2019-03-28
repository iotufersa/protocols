/* eslint-disable no-console */
const clc = require('cli-color');
const coap = require('coap');



function coapRequest(arg, url) {
    if( arg === 'get' ) {
        console.log('Fazendo uma requisicao...');
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
    else {
        console.log(clc.red('Argumento inválido!'));
    }
    
}

coapRequest(process.argv[2], process.argv[3]);