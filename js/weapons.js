function preload_weapons(){
  game.load.spritesheet('explosion', 'res/sprites/explode.png', 64, 64); 
  game.load.image('player-bullet','res/sprites/bullet.png');
  game.load.image('enemy-bullet','res/sprites/enemy-bullet.png');
}

function create_weapons(){
  bullets = game.add.group();
  bullets.enableBody = true;
}

function update_weapons(){
  //move bullets
  bullets.forEach(function(bullet){
    bullet.position.y+=bullet.speed
  });
}

function shoot(object,speed,type){
  var x = object.position.x;
  var y = object.position.y;
  
  var bullet = bullets.create(x,y,type);

  bullet.speed = speed;
  bullet.type = type;
}

function explosion(object){
  //get object center and center explosion on it
  var x = object.position.x;
  var y = object.position.y;
  object.kill();
  var explosion = game.add.sprite(x,y,'explosion');
  explosion.anchor.setTo(.5,.5);

  //add explosion animation
  explosion.animations.add('explode');
  explosion.animations.play('explode', 10, false);
  explosion.killOnComplete = true;
}
