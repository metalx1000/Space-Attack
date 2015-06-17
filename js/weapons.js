function preload_weapons(){
  game.load.spritesheet('explosion', 'res/sprites/explode.png', 64, 64); 
  game.load.image('player-bullet','res/sprites/bullet.png');
  game.load.image('enemy-bullet','res/sprites/enemy-bullet.png');
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
    bullet.position.y+=bullet.speed
  });

  enemyBullets.forEach(function(bullet){
    bullet.position.y+=bullet.speed
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
}

function explosion(object){
  //get object center and center explosion on it
  var x = object.position.x;
  var y = object.position.y;
  object.kill();
  object.alive = false;
  var explosion = game.add.sprite(x,y,'explosion');
  explosion.anchor.setTo(.5,.5);

  //add explosion animation
  explosion.animations.add('explode');
  explosion.animations.play('explode', 10, false);
  explosion.killOnComplete = true;
}
