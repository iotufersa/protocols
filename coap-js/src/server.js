/**
 * Incoming message -> request
 * Outgoing message -> response
 */


/* eslint-disable no-console */
const clc = require('cli-color');
const coap = require('coap');


// Create a server on coap://localhost:5683
function initCoapServer() {
    const server = coap.createServer();
    // the default CoAP port is 5683
    console.clear();
    console.log(clc.green('CoAp server is listening on coap://localhost:5683'));   
    return server;
} 





function main() {
    initCoapServer();
    
    const server = initCoapServer();

    server.listen();

    server.on('request', (req, res) => {
        if( req.method === 'GET' )
            getCoap(req, res);
        else if( req.method === 'POST' )
            /* postCoap() */ console.log('Post method!');
        else if( req.method === 'PUT' )
            /* putCoap() */ console.log('Put method!');
        else if( req.method === 'DELETE')
            /* deleteCoap() */ console.log('Delete method!');
    });
}

main();

// Functions to GET, POST, PUT, DELETE methods.

/**
 * 
 * @param {Object} req - Request{IncomingMessage}
 * @param {Object} res - Response{OutgoingMessage}
 * @return {void} void
 * @throws {Error} Wrong request for this CoAp method
 *
 * */ 
function getCoap(req, res) {
    if( req.method === 'GET' ) {
        console.log(clc.green('Requisicao GET recebida!'));
        res.end(`
        ${clc.green('--------------Resposta do servidor----------------')}
                Using the ${req.method} method on url ${req.url}
        `); // Say hello to the client
    } else
        throw new Error('Wrong request!');
}





/**
* var coap       = require('coap')
, server      = coap.createServer()

server.on('request', function(req, res) {
    res.end('Hello ' + req.url.split('/')[1] + '\n')
})

// the default CoAP port is 5683
server.listen(function() {
    var req = coap.request('coap://localhost/Matteo')
    
    req.on('response', function(res) {
        res.pipe(process.stdout)
        res.on('end', function() {
            process.exit(0)
        })
    })
    
    req.end()
})
*/
