function preload_weapons(){
  game.load.spritesheet('explosion', 'res/sprites/explode.png', 64, 64); 
  game.load.image('player-bullet','res/sprites/bullet.png');
  game.load.image('enemy-bullet','res/sprites/enemy-bullet.png');

  //sounds
  game.load.audio('explosion1',['res/sounds/SFX_Explosion_05.wav']);
  game.load.audio('explosion2',['res/sounds/SFX_Explosion_07.wav']);

  game.load.audio('laser1',['res/sounds/laser5.mp3', 'res/sounds/laser5.ogg']);
  game.load.audio('laser2',['res/sounds/laser9.mp3', 'res/sounds/laser9.ogg']);
}

function create_weapons(){
  //create bullet groups and give them bodies for collision
  playerBullets = game.add.group();
  playerBullets.enableBody = true;
  enemyBullets = game.add.group();
  enemyBullets.enableBody = true;
  explosions = game.add.group();
}

function update_weapons(){
  //move bullets
  playerBullets.forEach(function(bullet){
    bullet.position.y+=bullet.speed;
    if(bullet.position.y < 0 || bullet.position.y > game.world.height){
      bullet.destroy();
    }
  });

  enemyBullets.forEach(function(bullet){
    bullet.position.y+=bullet.speed;
    if(bullet.position.y < 0 || bullet.position.y > game.world.height){
      bullet.destroy();
    }
  });

  //remove explosions after timeout
  explosions.forEach(function(explosion){
    if(game.time.now > explosion.timeout){
      explosion.destroy();
    }
  });
  //if bullet hits something
  game.physics.arcade.overlap(playerBullets, enemies, shot, null, this);
  game.physics.arcade.overlap(enemyBullets, players, shot, null, this);
}

function shot(bullet,object){
  bullet.kill();
  if(bullet.type == "player-bullet"){
    explosion(object);
  }else if(bullet.type == "enemy-bullet"){
    kill_player(object,bullet);
  }
}

function shoot(object,speed,type){
  var x = object.position.x;
  var y = object.position.y;
  
  if(type == "player-bullet"){
    var laser_sfx = game.add.audio('laser2');
    var bullet = playerBullets.create(x,y,type);
  }else if(type == "enemy-bullet"){
    var laser_sfx = game.add.audio('laser1');
    var bullet = enemyBullets.create(x,y,type);
  }
 
  laser_sfx.play();
  bullet.speed = speed;
  bullet.type = type;
}

function explosion(object){
  //get object center and center explosion on it
  var x = object.position.x;
  var y = object.position.y;
  var explosion = explosions.create(x,y,'explosion');
  explosion.anchor.setTo(.5,.5);

  explosion.timeout = game.time.now + 5000;
  //play sound depending on object type
  if(object.player){
    var explode_sfx = game.add.audio('explosion2');
    explode_sfx.play();
    object.kill();
  }else{
    enemy_death(object);
  }



  //add explosion animation
  explosion.animations.add('explode');
  explosion.animations.play('explode', 10, false);
}

