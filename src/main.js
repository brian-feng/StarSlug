// chomp sound effect: https://freesound.org/people/TheDragonsSpark/sounds/543386/
// heal sound effect: https://freesound.org/people/Romeo_Kaleikau/sounds/588251/
// explosion sound effect: https://freesound.org/people/MATRIXXX_/sounds/515005/
// start sound effect: https://freesound.org/people/MATRIXXX_/sounds/404151/
/* 1) I think the most technically interesting thing in my game is how the slugs'
 * hitboxes and visuals change after creating the asset initially. I did not think it
 * was possible initially until I found out .setScale() could be used alongside an array
 * of current size values to produce this intended effect.
 * 
 * 2) I intiially came up with the idea of an endless runner similar to temple run where
 * mistakes do not cause an instant game over, but put you in danger. Instead of just having
 * three states: safe, danger, and dead, my game's slugs just grow and grow for every allergen
 * free halal chicken thigh they get to eat. I thought it was a new take on a genre where 
 * gameplay usually gets harder with more bullets or faster bullets. Instead, difficulty increases
 * available space decreases.
 */


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