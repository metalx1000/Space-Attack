function preload_weapons(){
  game.load.spritesheet('explosion', 'res/sprites/explode.png', 64, 64); 
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
