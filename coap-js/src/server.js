/**
 * Incoming message -> request
 * Outgoing message -> response
 */


/* eslint-disable no-console */
const clc = require('cli-color');
const coap = require('coap');


// Create a server on coap://localhost:5683
function initCoapServer() {
    // the default CoAP port is 5683
    console.clear();
    console.log(clc.green('-------------------------------------------------'));
    console.log('CoAp server is listening on coap://localhost:5683');
    console.log(clc.green('-------------------------------------------------'));
    return coap.createServer();
}

function main() {
    try {
        initCoapServer();

        const server = initCoapServer();

        server.listen();

        server.on('request', (req, res) => {
            responseCoap(req, res);
            /*
            if (req.method === 'GET')
                getCoap(req, res);
            else if (req.method === 'POST')
                postCoap(req, res);
            else if (req.method === 'PUT')
                putCoap(req, res); //console.log('Put method!');
            else if (req.method === 'DELETE')
                deleteCoap(req, res); //console.log('Delete method!');
            */
        });

    } catch (error) {
        console.error(error);
    }

}

main();

/**
 * Function to simple GET, POST, PUT, DELETE methods.
 * @param {Object} req - client request {IncomingMessage} 
 * @param {*} res - server response {OutgoingMessage}
 */
function responseCoap(req, res) {
    console.log(clc.green(req.method + ' request received!'));
    res.end(`
        ${clc.green('--------------Server Response----------------')}
                 Using the ${req.method} method on url ${req.url}
        ${clc.green('---------------------------------------------')}

        `); // respose to client
}

// // Functions to simple GET, POST, PUT, DELETE methods.
// /**
//  * 
//  * @param {Object} req - Request{IncomingMessage}
//  * @param {Object} res - Response{OutgoingMessage}
//  * 
//  * */

//  /*
// function getCoap(req, res) {
//     console.log(clc.green('GET request received!'));
//     res.end(`
//         ${clc.green('--------------Server Response----------------')}
//                  Using the ${req.method} method on url ${req.url}
//         ${clc.green('---------------------------------------------')}

//         `); // respose to client
// }

// /**
//  * 
//  * @param {Object} req - Request{IncomingMessage}
//  * @param {Object} res - Response{OutgoingMessage}
//  *
//  * */
// function postCoap(req, res) {
//     console.log(clc.green('POST request received!'));
//     res.end(`
//         ${clc.green('--------------Server Response----------------')}
//                  Using the ${req.method} method on url ${req.url}
//         ${clc.green('---------------------------------------------')}
//         `); // Say hello to the client 
// }

// /**
//  * 
//  * @param {Object} req - Request{IncomingMessage}
//  * @param {Object} res - Response{OutgoingMessage}
//  *
//  * */
// function putCoap(req, res) {
//     console.log(clc.green('PUT request received!'));
//     res.end(`
//         ${clc.green('--------------Server Response----------------')}
//                  Using the ${req.method} method on url ${req.url}
//         ${clc.green('---------------------------------------------')}    
//         `); // Say hello to the client 
// }

// /**
//  * 
//  * @param {Object} req - Request{IncomingMessage}
//  * @param {Object} res - Response{OutgoingMessage}
//  *
//  * */
// function deleteCoap(req, res) {
//     console.log(clc.green('DELETE request received!'));
//     res.end(`
//         ${clc.green('--------------Server Response----------------')}
//                  Using the ${req.method} method on url ${req.url}
//         ${clc.green('---------------------------------------------')}
//         `); // Say hello to the client 
// }
// /**
// * var coap       = require('coap')
// , server      = coap.createServer()

// server.on('request', function(req, res) {
//     res.end('Hello ' + req.url.split('/')[1] + '\n')
// })

// // the default CoAP port is 5683
// server.listen(function() {
//     var req = coap.request('coap://localhost/Matteo')
    
//     req.on('response', function(res) {
//         res.pipe(process.stdout)
//         res.on('end', function() {
//             process.exit(0)
//         })
//     })
    
//     req.end()
// })
// */