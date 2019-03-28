var player = require('play-sound')();

/**
 * Play a beep
 */
function beep() {
    player.play('audio/beep.mp3', function (err) {
        if (err) throw err;
    });
}

/**
 * Play a music
 * @param {string} music - music to play 
 */
function sound(music) {
    player.play(`audio/${music}.mp3`, function (err) {
        if (err) throw err;
    });
}


module.exports = {
    beep,
    sound
};
