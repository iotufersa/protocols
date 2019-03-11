/**
 * Commander is a lib to help create CLI(Command Line Interfaces)
 */

const Commander = require('commander');
const clc = require('cli-color');
const service = require('./services/service-swapi');

Commander.description(`CLI to test multi-protocol API's for IoT

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
        .version('v0.1.0')
        .option('-wp, --protocol [value]', 'Wanted protocol')
        .option('-p, --posthttp [value]', 'HTTP verb POST [CREATE]')
        .option('-g, --gethttp [value]', 'HTTP verb GET [READ]')
        .option('-p, --puthttp [value]', 'HTTP verb PUT [UPDATE]')
        .option('-d, --deletehttp [value]', 'HTTP verb DELETE [DELETE]')

        .parse(process.argv);

    // const post;
    // const get = Commander.gethttp;
    // const put;
    // const delete;

    try {
        if (Commander.posthttp)
            return;
        else if (Commander.gethttp)
            getHttp(Commander.gethttp);
        else if (Commander.puthttp)
            return;
        else if (Commander.deletehttp)
            return;


    } catch (error) {
        console.error('deu ruim ', error);
    }
}

main();

// This function user service-swapi to 
async function getHttp(get) {

    const result = await service.getCharactersByName(get);
    console.log('Resultado: \n', result);

    // Teste de perfomance -> map vs foreach <- 
    //console.time('map-time');
    //const resultNames = result.map(character => character.name);
    //console.timeEnd('map-time');

    // console.time('forof-time');
    // for (const pessoa of result) { 
    //     responses.push(pessoa.name); 
    // }
    // console.timeEnd('forof-time');

}