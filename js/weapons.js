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
  explosions = game.add.group();
}

function update_weapons(){
  //move bullets
  playerBullets.forEach(function(bullet){
    bullet.position.y+=bullet.speed;
    if(bullet.position.y < 0 || bullet.position.y > game.world.height
      ||game.time.now > bullet.timeout){
      bullet.destroy();
    }
    
    if(game.time.now > bullet.explodeTime){
      explosion(bullet);
      bullet.destroy();
    }
  });

  enemyBullets.forEach(function(bullet){
    bullet.position.y+=bullet.speed;
    if(bullet.position.y < 0 || bullet.position.y > game.world.height
      ||game.time.now > bullet.timeout){
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
  if(object.boss && bullet.dead != true){
    bullet.dead = true;
    object.life-=1;
    hit(object);
    var delay = Math.floor(Math.random() * 400) + 200;
    bullet.explodeTime = game.time.now + delay;

  }else if(!object.boss){
    bullet.kill();
  }

  if(bullet.type == "player-bullet" && bullet.dead != true){
    hit(object);
  }else if(bullet.type == "enemy-bullet"){
    hit_player(object,bullet);
  }
}

function shoot(object,speed,type,size,x,y,velx,bulletType){
  if(typeof size === 'undefined'){size = 1}
  if(typeof x === 'undefined'){ x = object.position.x;}
  if(typeof y === 'undefined'){ y = object.position.y;}
  if(typeof velx === 'undefined'){ velx = 0;}
  if(typeof bulletType === 'undefined'){ bulletType = type;}
  
  if(type == "player-bullet"){
    var laser_sfx = game.add.audio('laser2');
    var bullet = playerBullets.create(x,y,bulletType);
  }else if(type == "enemy-bullet"){
    var laser_sfx = game.add.audio('laser1');
    var bullet = enemyBullets.create(x,y,bulletType);
  }
 
  bullet.anchor.setTo(.5,.5);
  bullet.scale.setTo(size,size);
  laser_sfx.play();
  bullet.speed = speed;
  bullet.type = type;
  bullet.body.velocity.x = velx;
  bullet.timeout = game.time.now + 5000;
}

function explosion(object,snd,size,x,y){
  if(typeof snd === 'undefined'){snd = 'explosion1'}
  if(typeof size === 'undefined'){size = 1}

  //play sound 
  var explode_sfx = game.add.audio(snd);
  explode_sfx.play();

  //get object center and center explosion on it
  if(typeof object !== 'undefined'){
    var x = object.position.x;
    var y = object.position.y;
  }
  var explosion = explosions.create(x,y,'explosion');
  explosion.anchor.setTo(.5,.5);
  explosion.scale.setTo(size,size);

  explosion.timeout = game.time.now + 5000;

  //add explosion animation
  explosion.animations.add('explode');
  explosion.animations.play('explode', 10, false);
}

function hit(object){
  if(!object.boss){
    object.life-=1; 
  }
  score+=10;
  if(object.life <= 0){
    enemy_death(object);
  }else{
    var hit_sfx = game.add.audio('hit');
    hit_sfx.volume = 0.2;
    hit_sfx.play();
  }
}



