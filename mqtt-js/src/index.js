const mqtt = require('mqtt');
const clc = require('cli-color');
const audio = require('./audio');

const broker = 'mqtt://broker.hivemq.com';
const topic = 'IotUfersa';

function main() {
    try {
        console.log(clc.yellow(`[STATUS] Tentando estabelecer conexão com o broker: ${broker}`));
        const client = mqtt.connect(broker);
        console.log(clc.green('[STATUS] Conexão estabelecida com sucesso!'));

        console.log(clc.green(`[STATUS] Escutando mensagens no tópico ${topic}`));
        client.on('connect', () => {
            client.subscribe(topic);
        });

        client.on('message', (topic, message) => {
            console.log(`TOPIC: ${topic}\nMESSAGE: ${message}`);
            if(message.toString() === 'beep') {
                audio.beep();
            }
            else if(message.toString() === 'marilia') {
                audio.sound(message.toString());
            }
            else {
                audio.beep();
            }

        });

    } catch (error) {
        console.error(clc.red('[STATUS] Não foi possível estabelecer comunicação'));
    }
}
main();