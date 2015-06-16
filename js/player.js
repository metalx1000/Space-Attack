var player;

function preload_player(){
  game.load.image('player','res/sprites/ship.png');
}

function create_player(){
  player = game.add.sprite(game.width/2,game.height-128,'player');
  //center of player to center of image
  player.anchor.setTo(0.5,0.5);  
  
  //enable physics
  game.physics.enable(player, Phaser.Physics.ARCADE);
}

function update_player(){
  //follow cursor  
  game.physics.arcade.moveToPointer(player, 400);

  //stop movement when player reaches cursor
  if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
  {
      player.body.velocity.setTo(0, 0);
  }

}
