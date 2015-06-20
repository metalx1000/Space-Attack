var enemy_timer;
//set original delay for new enemy spawning
var enemy_wait1 = 3000;
var enemy_wait2 = 1000;
var enemies_killed = 0;

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
    if(game.time.now > enemy.shootTime){
      shoot(enemy,10,"enemy-bullet");
      enemy.shootTime = game.time.now + Math.floor(Math.random() * enemy_wait1) + 1000;
    }

    if(enemy.position.y > game.world.height + 64){
      enemy.destroy();
    }
  });
}

function new_enemy(){
  //set enemy position
  //keep it from going off the side of the screen
  var x = game.world.randomX;
  if(x < 64){
    x = 64;
  }else if(x > game.width-64){
    x = game.width-64;
  }
  var enemy = enemies.create(x,-64,'enemy');
  enemy.scale.setTo(.5,.5);
  enemy.anchor.setTo(.5,.5);

  //set enemy speed between 
  enemy.speed = Math.floor(Math.random() * 300) + 100;
  enemy.body.velocity.y = enemy.speed;
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

function enemy_death(object){
  var explode_sfx = game.add.audio('explosion1');
  explode_sfx.play();
  object.destroy();
  enemies_killed+=1;
  if(enemies_killed%10 == 0){
    message("kill_bonus");
    score+=100;
  }

  score+=10;
}

