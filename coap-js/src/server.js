/* eslint-disable no-console */
const coap        = require('coap')
    , server    = coap.createServer(); // Create a server on coap://localhost:5683

// the default CoAP port is 5683
server.listen(() => {
    console.clear();
    console.log('CoAp server is listening on coap://localhost/');   
});


server.on('request', (req, res) => {
    
    if(req.method === 'GET') {
        console.log('Requisicao GET recebida!');
        res.end(`
        --------------Resposta do servidor----------------
            Using the + ${req.method} method on url ${req.url}
        `); // Say hello to the client
    }
});

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
