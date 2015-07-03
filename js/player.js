var player;
var player_deaths = 0;
var gamepadSpeed = 400;
var score = 0;
var click = 0;

function create_player(){
  players = game.add.group();
  players.enableBody = true;
  
  new_player();
}

function update_player(){

  //if player and enemy collide kill player
  game.physics.arcade.overlap(player, enemies, hit_player, null, this);

  if(!player.alive && game.time.now > player.spawnTime){
    new_player();
  }
  if(game.time.now > player.invinTime){
    player_invincible(player,false);
  }
}

function new_player(){

  //add ship image
  player = players.create(game.width/2,game.height-128,'player');
  player.shoot = true;
  //stop player from going off screen
  player.body.collideWorldBounds = true;
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

function player_shoot(){
  if(player.shoot){
    if(player.weapon == "diagonal_gun"){
      shoot(player,-5,"player-bullet",undefined,undefined,undefined,20);
      shoot(player,-5,"player-bullet",undefined,undefined,undefined,-20);
      shoot(player,-5,"player-bullet");
      click = 1;
    }else if(player.weapon == "diagonal_gun2"){
      shoot(player,-5,"player-bullet",undefined,undefined,undefined,20,"plasmaShot"); 
      shoot(player,-5,"player-bullet",undefined,undefined,undefined,-20,"plasmaShot"); 
      shoot(player,5,"player-bullet",undefined,undefined,undefined,20,"plasmaShot"); 
      shoot(player,5,"player-bullet",undefined,undefined,undefined,-20,"plasmaShot"); 
    }else if(player.weapon == "diagonal_gun3"){
      shoot(player,-5,"player-bullet",undefined,undefined,undefined,0,"plasmaShot"); 
      shoot(player,0,"player-bullet",undefined,undefined,undefined,-200,"plasmaShot"); 
      shoot(player,0,"player-bullet",undefined,undefined,undefined,200,"plasmaShot"); 
      shoot(player,5,"player-bullet",undefined,undefined,undefined,0,"plasmaShot"); 
    }else{
      shoot(player,-5,"player-bullet");
      click = 1;
    }
  }

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
    player.spawnTime = game.time.now + 2000;

    //diplay death HUD message
    message("player_death");
  }
}

function player_invincible(player,set,time,msg){
  if(set == true){
    player.invincible = true;
    player.invinTime = game.time.now + time * 1000;
    player.loadTexture('player_invincible');
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
