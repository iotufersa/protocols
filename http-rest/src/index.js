/**
 * Commander is a lib to help create CLI(Command Line Interfaces)
 */

const Commander = require('commander');
const clc = require('cli-color');
const service = require('./services/service-swapi');

Commander.description(`CLI to test multi-protocol API's for IoT

${clc.yellow('Inicialmente estou usando a api swapi para fins de teste')}

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
        .option('-ps --post [value]', 'HTTP verb POST [CREATE]')
        .option('-g --get [value]', 'HTTP verb GET [READ]')
        .option('-p --put [value]', 'HTTP verb PUT [UPDATE]')
        .option('-d --delete [value]', 'HTTP verb DELETE [DELETE]')

        .parse(process.argv);

    const { get } = Commander;

    try {
        const responses = [];

        if (Commander.get) {
            const result = await service.getCharactersByName(get);

            for (let pessoa of result.results) {
                responses.push(pessoa.name);
            }

            console.log('resultado: \n', responses);
            return;
        }
    } catch (error) {
        console.error(error);
    }
}

main();
