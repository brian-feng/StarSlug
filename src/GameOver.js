class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene")
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
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'GAME OVER', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4, 'Press [SPACE] to return to menu', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#E4E5D4';
        menuConfig.color = '#000';
        let x = 30
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize + borderPadding + 40, 'CREDITS:', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize + borderPadding + 40 + x, 'Sprites & Programming: Brian Feng', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize + borderPadding + 40 + 2*x, 'Chomp sound: TheDragonsSpark', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize + borderPadding + 40 + 3*x, 'Heal sound: Romeo_Kaleikau', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize + borderPadding + 40 + 4*x, 'Explosion sound: MATRIXXX_', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize + borderPadding + 40 + 5*x, 'Start sound: MATRIXXX_', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize + borderPadding + 40 + 6*x, 'BGM: Evgeny_Bardyuzha', menuConfig).setOrigin(0.5);


        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
          this.sound.play('start');
          this.scene.start('menuScene');    
        }
      }
}
