// chomp sound effect: https://freesound.org/people/TheDragonsSpark/sounds/543386/
// heal sound effect: https://freesound.org/people/Romeo_Kaleikau/sounds/588251/
// explosion sound effect: https://freesound.org/people/MATRIXXX_/sounds/515005/
// start sound effect: https://freesound.org/people/MATRIXXX_/sounds/404151/

let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    width: 600,
    height: 400,
    scene: [Menu, Play, GameOver]
}

let game = new Phaser.Game(config)
let {height, width} = game.config
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let keySPACE
let cursors
let difficulty