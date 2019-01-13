/*
  Phaser Jump Pt.1 : Creating a Phaser Scene
*/


let game; // phaser game object
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
}

function create(){
  /* this is where to create objects and add images and spritesheets
  /* images are positioned from their center (x - w/2, y - h/2) */
  this.add.image(240, 320, 'night-sky');
}

function update(){
 /*
   This will act as the game loop
   - We'll track user input
   - Update the player's velocity and position
   - Move the platforms 
  */
}



