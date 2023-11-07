class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.atlas('character', './assets/character.png', './assets/character.json')
        this.load.atlas('slug', './assets/slug.png', './assets/slug.json')
        this.load.image('food', './assets/food.png')
        this.load.image('coffee', "./assets/coffee.png")
        this.load.audio('chomp', "./assets/chomp.wav")
        this.load.audio('heal', "./assets/heal.wav")
        this.load.audio('explosion', "./assets/explosion.wav")
        this.load.audio('bgm', './assets/bgm.mp3')
    }

    create() {
        this.bgm = this.sound.add('bgm')
        this.bgm.setLoop(true)
        this.bgm.setVolume(0.1)
        this.bgm.play()

        this.background = this.add.tileSprite(0, 0, 600, 400, 'background').setOrigin(0, 0)

        this.anims.create({ 
            key: 'default', 
            frames: this.anims.generateFrameNames('character', { 
                prefix: 'char', 
                start: 0,
                end: 1,
                zeroPad: 2
            }), 
            repeat: -1,
            frameRate: 5
        });

        this.anims.create({
            key: 'squirm',
            frames: this.anims.generateFrameNames('slug', {
                prefix: 'slug',
                start: 0,
                end: 1,
                zeroPad: 2
            }),
            repeat: -1,
            frameRate: 2
        })

        this.player = this.physics.add.sprite(width / 2, height / 2, 'character', 1).setScale(2.5).play('default', true)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(10, 10).setOffset(3, 0)
        this.PLAYER_VELOCITY = 250
        this.playerSize = 2.5

        this.slug1 = this.physics.add.sprite(width/7-45, height - 40, 'slug', 1).setScale(2.5).play('squirm')
        this.slug1.body.setSize(20, 55).setOffset(10, 3)
        this.slug1.body.setImmovable(true)
        
        this.slug2 = this.physics.add.sprite(2*width/7-45, height - 40, 'slug', 1).setScale(2.5).play('squirm')
        this.slug2.body.setSize(20, 55).setOffset(10, 3)
        this.slug2.body.setImmovable(true)
        
        this.slug3 = this.physics.add.sprite(3*width/7-45, height - 40, 'slug', 1).setScale(2.5).play('squirm')
        this.slug3.body.setSize(20, 55).setOffset(10, 3)
        this.slug3.body.setImmovable(true)

        this.slug4 = this.physics.add.sprite(4*width/7-45, height - 40, 'slug', 1).setScale(2.5).play('squirm')
        this.slug4.body.setSize(20, 55).setOffset(10, 3)
        this.slug4.body.setImmovable(true)

        this.slug5 = this.physics.add.sprite(5*width/7-45, height - 40, 'slug', 1).setScale(2.5).play('squirm')
        this.slug5.body.setSize(20, 55).setOffset(10, 3)
        this.slug5.body.setImmovable(true)

        this.slug6 = this.physics.add.sprite(6*width/7-45, height - 40, 'slug', 1).setScale(2.5).play('squirm')
        this.slug6.body.setSize(20, 55).setOffset(10, 3)
        this.slug6.body.setImmovable(true)

        this.slug7 = this.physics.add.sprite(width-45, height - 40, 'slug', 1).setScale(2.5).play('squirm')
        this.slug7.body.setSize(20, 55).setOffset(10, 3)
        this.slug7.body.setImmovable(true)

        this.slugs = [this.slug1, this.slug2, this.slug3, this.slug4, this.slug5, this.slug6, this.slug7]
        this.slugSizes = [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
        this.food = []

        this.chomp = this.sound.add('chomp')
        this.heal = this.sound.add('heal')
        this.explosion = this.sound.add('explosion')

        this.gameOver = false

        for(let i = 0; i < 7; i++){
            this.physics.add.collider(this.player, this.slugs[i], (player, slug) => {
                this.gameOver = true
                this.player.destroy()
                this.explosion.play()
                this.bgm.stop()
                this.scene.start('gameOverScene')
            })
        }

        cursors = this.input.keyboard.createCursorKeys()

        this.difficulty = 1000
        this.speedTimer = 0
        this.FOOD_VELOCITY = 150    
    }

    update() {
        if(!this.gameOver){
            let playerVector = new Phaser.Math.Vector2(0, 0)
            if(cursors.left.isDown){
                playerVector.x = -1
            }
            else if(cursors.right.isDown){
                playerVector.x = 1
            }

            if(cursors.up.isDown){
                playerVector.y = -1
            }
            else if(cursors.down.isDown){
                playerVector.y = 1
            }
            playerVector.normalize()
            this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
            
            this.background.tilePositionY -= 4

            if(Math.random()*100 < 1){
                let temp = this.physics.add.sprite(Math.random()*width, 0, 'coffee', 1)
                this.FOOD_VELOCITY += 1
                temp.setSize(20, 40)
                temp.setVelocityY(this.FOOD_VELOCITY)
                for(let i = 0; i < 7; i++){
                    this.physics.add.collider(temp, this.slugs[i], () => {
                        temp.destroy()
                        this.chomp.play()
                        this.slugSizes[i] += 0.1
                        this.slugs[i].setScale(this.slugSizes[i])
                        this.slugs[i].setY(this.slugs[i].y - 5)
                        this.difficulty += 1
                    })
                }
                this.physics.add.collider(temp, this.player, () => {
                    temp.destroy()
                    this.heal.play()
                    this.PLAYER_VELOCITY = 750
                    let clock = this.time.delayedCall(1000, () => {
                        this.PLAYER_VELOCITY = 250  
                    })
                })
            }
            else if(Math.random()*20000 < this.difficulty){
                let temp = this.physics.add.sprite(Math.random()*width, 0, 'food', 1)
                temp.setSize(20, 40)
                temp.setVelocityY(this.FOOD_VELOCITY)
                temp.flipY = true
                this.difficulty += 1
                for(let i = 0; i < 7; i++){
                    this.physics.add.collider(temp, this.slugs[i], () => {
                        temp.destroy()
                        this.chomp.play()
                        this.slugSizes[i] += 0.1
                        this.slugs[i].setScale(this.slugSizes[i])
                        this.slugs[i].setY(this.slugs[i].y - 5)
                        this.difficulty += 1
                    })
                }
                this.physics.add.collider(temp, this.player, () => {
                    temp.destroy()
                    this.chomp.play()
                    this.player.setScale(this.playerSize)
                })
            }
        }
    }
}