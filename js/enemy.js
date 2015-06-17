var enemy_timer;
//set original delay for new enemy spawning
var enemy_wait1 = 3000;
var enemy_wait2 = 1000;

function preload_enemy(){
  game.load.image('enemy', 'res/sprites/alien_ship.png');
}

function create_enemy(){
  enemies = game.add.group();
  enemies.enableBody = true;    
  new_enemy();
}

function update_enemy(){
  if(game.time.now > enemy_timer){
    new_enemy();
  }   

  enemies.forEach(function(enemy){
    if(game.time.now > enemy.shootTime && enemy.alive == true){
      shoot(enemy,10,"enemy-bullet");
      enemy.shootTime = game.time.now + Math.floor(Math.random() * enemy_wait1) + 1000;
    }
  });
}

function new_enemy(){
  var enemy = enemies.create(game.world.randomX,-64,'enemy');
  enemy.scale.setTo(.5,.5);
  enemy.anchor.setTo(.5,.5);

  //set enemy speed between 2,000 and 5,000
  //lower values makes the ship faster
  enemy.speed = Math.floor(Math.random() * 5000) + 2000;
  game.add.tween(enemy).to({y: game.world.height+256}, enemy.speed, "Linear", true);
  enemy.ship = true;

  //set random shoot time for enemy
  enemy.shootTime = game.time.now + Math.floor(Math.random() * 3000) + 1000;
  //set delay for next enemy between 1 and 3 seconds
  //And speed up as time goes on
  var delay = Math.floor(Math.random() * enemy_wait1) + enemy_wait2
  if(enemy_wait1 > 2000){
    enemy_wait1-=10
  }
  if(enemy_wait2 > 500){
    enemy_wait2-=10
  }

  enemy_timer = game.time.now + delay

}

