var player = require('play-sound')();

function beep() {
    player.play('beep.mp3', function (err) {
        if (err) throw err;
    });
}

function sound(music) {
    player.play(`${music}.mp3`, function (err) {
        if (err) throw err;
    });
}


module.exports = {
    beep,
    sound
};