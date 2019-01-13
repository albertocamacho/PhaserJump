/*
  Phaser Jump Pt.4 : Moving Platforms
*/


let game;
let platforms;  // a group of platform objects the player will jump on
let player; // the actual player controlled sprite
let cursors;
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
  this.load.image('night-sky', 'assets/night-sky.jpg');
  this.load.image('platform', 'assets/platform.png');
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48
  });
}
   
function create(){
  this.add.image(240, 320, 'night-sky'); 
  this.physics.world.setBounds(0, 0, 480, 640);
  platforms = this.physics.add.group({
        allowGravity: false,
        immovable: true,
  });

  for(let i = 0; i < 8; i++){
    let randomX = Math.floor(Math.random() * 400) + 24;
    platforms.create(randomX, i * 80, 'platform');
  }

  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(1);
  player.setCollideWorldBounds(true);
  player.body.checkCollision.up = false;
  player.body.checkCollision.left = false;
  player.body.checkCollision.right = false;


  /* Add the character animations */
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

  cursors = this.input.keyboard.createCursorKeys();
}

function update(){
  if (cursors.left.isDown)
  {
      player.setVelocityX(-240); // we want to apply a negative x velocity to go left on the screen
      player.anims.play('left', true); //play the left spritesheet animation
  }
  else if (cursors.right.isDown)
  {
      player.setVelocityX(240); // we want to apply a positive x velocity to go right on the screen
      player.anims.play('right', true); //play the right spritesheet animation
  }
  else
  {   
      //if we don't include this then the player will always be going right or left instead of a L/R neutral upwards direction
      player.setVelocityX(0);
      player.anims.play('turn');
  }
  // When the player is touching a platform, then we set it's velocity to a negative to propel the player upwards like a bounce
  if (player.body.touching.down)
  {
      player.setVelocityY(-400);
  }
  // We want to the platforms to move downwards and create an effect of progressing upwards
  // This can be done by moving the camera but can also be done by moving the world around the player
  if (player.body.y <  gameOptions.height/2) {
      platforms.children.iterate(updateY, this);
  }
}


// With this function, we move the platforms lower until they're off screen and then we reposition
// them above the screen to create an endless effect.
function updateY(platform){
  let delta = Math.floor(gameOptions.height/2) - player.y;  // we want to keep the player somewhere in the center of the screen so we'll measure the difference from the center y
  
  if(delta > 0){ 
      platform.y += delta/30; //the delta may be too large so I'll make it smaller by dividing it by 30
  }

  if(platform.y > 640){
    platform.y = -platform.height;
    platform.x = Math.floor(Math.random() * 400) + 24;
  }
}


