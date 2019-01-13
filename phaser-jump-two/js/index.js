/*
  Phaser Jump Pt.2 : Creating Objects
*/


let game; // phaser game object
let platforms;  // a group of platform objects the player will jump on
let player; // the actual player controlled sprite
let gameOptions = {
  width: 480,
  height: 640,
  gravity: 800
}

let config = {
    type: Phaser.AUTO,
    width: gameOptions.width,
    height: gameOptions.height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: gameOptions.gravity },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

game = new Phaser.Game(config);





function preload(){
  // This is where we'll load all our images and sprites
  this.load.image('night-sky', 'assets/night-sky.jpg');
  this.load.image('platform', 'assets/platform.png');
    this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48
  });
}
   
function create(){
  /* this is where to create objects and add images and spritesheets
  /* images are positioned from their center (x - w/2, y - h/2) */
  this.add.image(240, 320, 'night-sky');

  platforms = this.physics.add.staticGroup();

  platforms.create(100, 350, 'platform');
  platforms.create(250, 220, 'platform');
  platforms.create(350, 520, 'platform');


  player = this.physics.add.sprite(100, 150, 'dude');
  player.setBounce(1);
  player.setCollideWorldBounds(true);
  player.body.checkCollision.up = false;


  /* A character animation created from the dude.png spritesheet */
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });


  //In order for our platforms to interact with the player we add a collider  
  this.physics.add.collider(player, platforms);


}

function update(){
 /*
   This will act as the game loop
   - We'll track user input
   - Update the player's velocity and position
   - Move the platforms 
  */
}


