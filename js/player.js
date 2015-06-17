var player;
var click = 0;

function preload_player(){
  game.load.image('player','res/sprites/ship.png');
}

function create_player(){
  //add input for touch screen use
  game.input.addPointer();
  players = game.add.group();
  players.enableBody = true;
  new_player();
}

function update_player(){
  //follow cursor  
  game.physics.arcade.moveToPointer(player, 400);
  
  //if player and enemy collide kill player
  game.physics.arcade.overlap(player, enemies, kill_player, null, this);

  //stop movement when player reaches cursor
  if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
  {
      player.body.velocity.setTo(0, 0);
  }

  //shoot once on mouse click or touch screen press
  if (game.input.mousePointer.isDown && click == 0 && player.alive == true
  ||game.input.pointer1.isDown && click == 0 && player.alive == true){
    shoot(player,-5,"player-bullet");
    click = 1;
  }else if(game.input.mousePointer.isUp && game.input.pointer1.isUp){
    //on triger release all for shooting again
    click = 0;
  }
}

function new_player(){

  //add ship image
  player = players.create(game.width/2,game.height-128,'player');
  //resize
  player.scale.setTo(.5,.5);

  //center of player to center of image
  player.anchor.setTo(0.5,0.5);  
 
  player.alive = true;
 
  //enable physics
  game.physics.enable(player, Phaser.Physics.ARCADE);

}

function kill_player(player, enemy){
  //call explosions
  explosion(player);
  player.alive = false;
  //check if enemy is a ship or bullet
  if(enemy.ship == true){
    explosion(enemy);
  }else{
    enemy.kill();
  }

  //wait before respawning player
  setTimeout(function(){
    new_player();
  },3000);
}
