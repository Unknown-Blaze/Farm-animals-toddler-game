var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
    preload: function(){
        this.load.image('background', './images/background.png');
        this.load.image('arrow', './images/arrow.png');

        this.load.spritesheet('chicken', './images/chicken_spritesheet.png', 131, 200, 3);
        this.load.spritesheet('horse', './images/horse_spritesheet.png', 212, 200, 3);
        this.load.spritesheet('pig', './images/pig_spritesheet.png', 297, 200, 3);
        this.load.spritesheet('sheep', './images/sheep_spritesheet.png', 244, 200, 3);

        this.load.audio('chickenSound', ['./audio/chicken.ogg','./audio/chicken.mp3' ])
        this.load.audio('horseSound', ['./audio/horse.ogg','./audio/horse.mp3' ])
        this.load.audio('pigSound', ['./audio/pig.ogg','./audio/pig.mp3' ])
        this.load.audio('sheepSound', ['./audio/sheep.ogg','./audio/sheep.mp3' ])

    }, 
    create: function(){

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.background = this.game.add.sprite(0, 0, 'background');

        var animalData = [{key: 'chicken', text: 'CHICKEN', audio: 'chickenSound'}, 
                          {key: 'horse', text: 'HORSE', audio: 'horseSound'}, 
                          {key: 'pig', text: 'PIG', audio: 'pigSound'}, 
                          {key: 'sheep', text: 'SHEEP', audio: 'sheepSound'}];
        this.animals = this.game.add.group();        

        var self = this;
        var animal;

        animalData.forEach(function(element){
            animal = self.animals.create(-1000, self.game.world.centerY, element.key, 2);
            animal.customParams = {text: element.text};
            animal.anchor.setTo(0.5);
            animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);
            animal.customParams = {text: element.text, sound: self.game.add.audio(element.audio)};
            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animateAnimal, self);
        });

        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

        this.showText(this.currentAnimal);

        /*
        this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
        this.chicken.anchor.setTo(0.5);
        this.chicken.scale.setTo(-2, 1);

        this.horse = this.game.add.sprite(100,100, 'horse');
        this.horse.anchor.setTo(0.5);

        this.pig = this.game.add.sprite(500, 100, 'pig');
        this.pig.anchor.setTo(0.5);
        this.pig.inputEnabled = true;
        this.pig.input.pixelPerfectClick = true;
        this.pig.events.onInputDown.add(this.animateAnimal, this)

        this.sheep = this.game.add.sprite(500, 500, 'sheep');
        this.sheep.anchor.setTo(0.5);
        this.sheep.angle = -5;
        */


        this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
        this.rightArrow.customParams = {direction: 1}

        this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.x = -1;
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);
        this.leftArrow.customParams = {direction: -1}

    },
    update: function(){

    },
    
    switchAnimal: function(sprite, event){
        if(this.isMoving){
            return false;
        }
        this.isMoving = true;

        this.animalText.visible = false;

        var newAnimal, endX;
        if(sprite.customParams.direction > 0){
            newAnimal = this.animals.next();
            newAnimal.x = -newAnimal.width/2;
            endX = 640 + this.currentAnimal.width/2;
        }else{
            newAnimal = this.animals.previous();
            newAnimal.x = 640 + newAnimal.width/2;
            endX = -this.currentAnimal.width/2;
        }
        var newAnimalMovement = this.game.add.tween(newAnimal);
        newAnimalMovement.to({x: this.game.world.centerX}, 1000);
        newAnimalMovement.onComplete.add(function(){
            this.isMoving = false
        this.showText(newAnimal)}, this)
        newAnimalMovement.start();
        
        var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
        currentAnimalMovement.to({x: endX}, 1000);
        currentAnimalMovement.start();

        this.currentAnimal = newAnimal 

    },
    showText: function(animal){
        var style = {font: 'bold 30pt Times New Roman', fill: '#f00', align: 'center'}
        if(!this.animalText){
            this.animalText = this.game.add.text(this.game.width/2, this.game.height*0.85, '', style)
            this.animalText.anchor.setTo(0.5);
        }
        this.animalText.setText(animal.customParams.text);
        this.animalText.visible = true;
    },
    animateAnimal: function(sprite, event){
        sprite.play('animate');
        sprite.customParams.sound.play();
    }
    
};
game.state.add('GameState', GameState);
game.state.start('GameState');
