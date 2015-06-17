function preload_weapons(){
  game.load.spritesheet('explosion', 'res/sprites/explode.png', 64, 64); 
  game.load.image('player-bullet','res/sprites/bullet.png');
  game.load.image('enemy-bullet','res/sprites/enemy-bullet.png');

  //sounds
  game.load.audio('explosion1',['res/sounds/SFX_Explosion_05.wav']);
  game.load.audio('explosion2',['res/sounds/SFX_Explosion_07.wav']);
}

function create_weapons(){
  //create bullet groups and give them bodies for collision
  playerBullets = game.add.group();
  playerBullets.enableBody = true;
  enemyBullets = game.add.group();
  enemyBullets.enableBody = true;
}

function update_weapons(){
  //move bullets
  playerBullets.forEach(function(bullet){
    bullet.position.y+=bullet.speed;
    if(game.time.now > bullet.life){
      bullet.kill();
    }
  });

  enemyBullets.forEach(function(bullet){
    bullet.position.y+=bullet.speed;
    if(game.time.now > bullet.life){
      bullet.kill();
    }
  });

  //if bullet hits something
  game.physics.arcade.overlap(playerBullets, enemies, shot, null, this);
  game.physics.arcade.overlap(enemyBullets, players, shot, null, this);
}

function shot(bullet,object){
  //bullet.kill();
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
    var bullet = playerBullets.create(x,y,type);
  }else if(type == "enemy-bullet"){
    var bullet = enemyBullets.create(x,y,type);
  }
  
  bullet.speed = speed;
  bullet.type = type;
  //bullet will die after 10 seconds
  bullet.life = game.time.now + 10000;
}

function explosion(object){
  //get object center and center explosion on it
  var x = object.position.x;
  var y = object.position.y;
  object.kill();
  object.alive = false;
  var explosion = game.add.sprite(x,y,'explosion');
  explosion.anchor.setTo(.5,.5);

  //play sound depending on object type
  if(object.player){
    var explode_sfx = game.add.audio('explosion2');
  }else{
    var explode_sfx = game.add.audio('explosion1');
  }

  explode_sfx.play();


  //add explosion animation
  explosion.animations.add('explode');
  explosion.animations.play('explode', 10, false);
  explosion.killOnComplete = true;
}
