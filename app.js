var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
    preload: function(){
        this.load.image('background', './images/background.png');
        this.load.image('chicken', './images/chicken.png');
        this.load.image('horse', './images/horse.png');
        this.load.image('pig', './images/pig.png');
        this.load.image('sheep', './images/sheep.png');
        this.load.image('arrow', './images/arrow.png');
    }, 
    create: function(){

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.background = this.game.add.sprite(0, 0, 'background');

        var animalData = [{key: 'chicken', text: 'CHICKEN'}, 
                          {key: 'horse', text: 'HORSE'}, 
                          {key: 'pig', text: 'PIG'}, 
                          {key: 'sheep', text: 'SHEEP'}];
        this.animals = this.game.add.group();        
        console.log(this.animals)
        var self = this;
        var animal;


        
        animalData.forEach(function(element){
            animal = self.animals.create(300, self.game.world.centerY, element.key);
            animal.customParams = {text: element.text};
            animal.anchor.setTo(0.5);
            //animal.customParams = {text: element.text};
            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animateAnimal, self);
        });
        
        // for(var i = 0; i < 4; i++){
        //     animal = self.animals.create(300, self.game.world.centerY, animalData[i].key);
        // }

        console.log(this.animals)
        console.log(this.animals.next())

        this.currentAnimal = this.animals.next();
        // console.log(this.currentAnimal)
        this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

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

        this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.x = -1;
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

    },
    update: function(){

    },
    
    switchAnimal: function(sprite, event){
        console.log("Move")
    },
    animateAnimal: function(sprite, event){
        console.log("Animal animated")
        
    }
    
};
game.state.add('GameState', GameState);
game.state.start('GameState');