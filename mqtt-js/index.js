const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', () => {
    client.subscribe('presence', (err) => {
        if (!err) {
            client.publish('presence', '1');
        }
    });
});

client.on('message', (topic, message) => {
    // message is Buffer
    console.log('Voce ta conectado no topico:', topic);
    console.log(message.toString());
    client.end();
});