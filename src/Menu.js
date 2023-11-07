class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.audio('start', './assets/start.wav')
        this.load.image('background', './assets/background.png')
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 600, 400, 'background').setOrigin(0, 0)

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#E4E5D4',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding-20, 'STAR SLUG', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2-20, 'Move with WASD', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 30, 'Don\'t let the slugs eat the allergen', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 65, 'free halal chicken thighs!', menuConfig).setOrigin(0.5);

        
        menuConfig.backgroundColor = '#E4E5D4';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 80, 'Press [SPACE] to sart', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
          this.sound.play('start');
          this.scene.start('playScene');    
        }
      }
}
