var player;
var player_deaths = 0;
var score = 0;
var click = 0;

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
  game.physics.arcade.overlap(player, enemies, hit_player, null, this);

  //stop movement when player reaches cursor
  if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
  {
      player.body.velocity.setTo(0, 0);
  }

  //shoot once on mouse click or touch screen press
  if (game.input.mousePointer.isDown && click == 0 && player.alive == true
  ||game.input.pointer1.isDown && click == 0 && player.alive == true){
    if(player.weapon == "diagonal_gun"){
      shoot(player,-5,"player-bullet",undefined,undefined,undefined,20);
      shoot(player,-5,"player-bullet",undefined,undefined,undefined,-20);
      shoot(player,-5,"player-bullet");
      click = 1;
    }else{
      shoot(player,-5,"player-bullet");
      click = 1;
    }
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
 
  //give player invincibility for 2 seconds after spawning
  player_invincible(player,true,2)
  player.player = true; 
  //enable physics
  game.physics.enable(player, Phaser.Physics.ARCADE);

}

function hit_player(player, enemy){
  //if player is not invincible
  if(!player.invincible){
    //keep track of how many times player dies
    player_deaths+=1;

    //call explosions
    explosion(player, 'explosion2');
    player.kill();
    player.alive = false;
    //check if enemy is a ship or bullet
    if(enemy.ship && !enemy.boss){
      enemy_death(enemy);
    }else if(enemy.boss){
      //boss and player collide
    }else{
      enemy.kill();
    }

    //wait before respawning player
    setTimeout(function(){
      new_player();
    },3000);

    //diplay death HUD message
    message("player_death");
  }
}

function player_invincible(player,set,time,msg){
  if(set == true){
    player.invincible = true;
    player.loadTexture('player_invincible');
    game.time.events.add(time * 1000, player_invincible, this, player,false);
  }else{
    player.invincible = false;
    player.loadTexture('player');    
  }

  //display message on powerup
  if(msg == true){
    var snd = game.add.audio('invincibility');
    snd.play();
    message("hud_invincibility");
  }
  
}
