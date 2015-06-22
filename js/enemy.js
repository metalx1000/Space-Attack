var enemy_timer;
//set original delay for new enemy spawning
var enemy_wait1 = 3000;
var enemy_wait2 = 1000;
var enemies_killed = 0;

function preload_enemy(){
  game.load.image('enemy', 'res/sprites/alien_ship.png');
  game.load.image('enemy_blue', 'res/sprites/alien_ship_blue.png');
  game.load.image('enemy_green', 'res/sprites/alien_ship_green.png');

  game.load.image('boss_red', 'res/sprites/boss_red.png');
}

function create_enemy(){
  enemies = game.add.group();
  enemies.enableBody = true;    
}

function update_enemy(){
  if(typeof enemy_timer === 'undefined'){enemy_timer = game.time.now}
  if(game.time.now > enemy_timer){
    new_enemy();
    if(game.time.now > 240000){
      new_enemy("enemy_blue",3);
    }
  }   

  enemies.forEach(function(enemy){
    if(game.time.now > enemy.shootTime){
      shoot(enemy,10,"enemy-bullet");
      enemy.shootTime = game.time.now + Math.floor(Math.random() * enemy_wait1) + 1000;
    }

    if(enemy.position.y > game.world.height + 64){
      enemy.destroy();
    }

    if(enemy.boss){
      boss_update(enemy);       
    }
    
  });
}

function new_enemy(type,life,size,x,y){
  if(typeof type === 'undefined'){type = "enemy"}
  if(typeof life === 'undefined'){life = 1}
  if(typeof size === 'undefined'){size = .5}
  if(typeof y === 'undefined'){y = -64}

  if(typeof posx === 'undefined'){
    //set enemy position
    //keep it from going off the side of the screen
    var x = game.world.randomX;
    if(x < 64){
      x = 64;
    }else if(x > game.width-64){
      x = game.width-64;
    }
  }

  var enemy = enemies.create(x,y,type);
  enemy.scale.setTo(size,size);
  enemy.anchor.setTo(.5,.5);

  //set number of hit need to kill
  enemy.life = life;

  //set enemy speed between 
  enemy.speed = Math.floor(Math.random() * 300) + 100;
  if(type == "enemy_blue"){
    enemy.body.velocity.x = Math.floor(Math.random() * 30) + 10;
  }

  enemy.body.velocity.y = enemy.speed;
  enemy.ship = true;

  if(type.indexOf("boss")>=0){
    enemy.boss = true;
  };

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

function enemy_death(enemy){
  explosion(enemy);
  enemy.destroy();
  enemies_killed+=1;
  if(enemies_killed%50 == 0){
    message("excellent");
    score+=100;
  }else if(enemies_killed%10 == 0){
    message("kill_bonus");
    score+=100;
  }

  score+=10;
}

function boss_update(boss){
  if(boss.position.y > 0){
      boss.body.velocity.y = 0;
      boss.position.y = 0
      boss.body.velocity.x = 100;
  }

  if(boss.position.x > game.width - 100){
    boss.body.velocity.x = -100;
  }else if(boss.position.x < 100){
    boss.body.velocity.x = 100;
  }
 
}
