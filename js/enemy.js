var enemy_timer;
//set original delay for new enemy spawning
var enemy_wait1 = 3000;
var enemy_wait2 = 1000;
var enemies_killed = 0;

function create_enemy(){
  enemies = game.add.group();
  enemies.enableBody = true;    
}

function update_enemy(){
  if(typeof enemy_timer === 'undefined'){enemy_timer = game.time.now}
  if(game.time.now > enemy_timer){
    new_enemy();
    //wait for minutes into game then bring out first boss
    if(level == 0 && enemies_killed >= 100){
      level = 1;
      new_enemy('boss_red',200,5,game.width/2,-512);
    }else if(level == 2 && enemies_killed >= 200){
      level = 3;
      new_enemy('boss_blue',300,5,game.width/2,-512);
    }else if(level == 4 && enemies_killed >= 300){
      level = 5;
      megaDetination();
      new_powerup("powerUpPlus");
      //slow enemy attacks for a little
      enemy_wait1 = 10000;
      enemy_wait2 = 5000;
      new_enemy('boss_green',400,5,game.width/2,-512);
    }else if(level == 6 && enemies_killed >= 400){
      level = 7;
      megaDetination();
      new_powerup("powerUpPlus");
      //slow enemy attacks for a little
      enemy_wait1 = 10000;
      enemy_wait2 = 5000;
      new_enemy('boss_yellow',500,5,game.width/2,-512);
    }

    //add blue enemies after first boss destroyed
    if(level > 1){
      new_enemy("enemy_blue",3);
    }

    if(level > 3){
      new_enemy("enemy_green",3);
    }
    
    if(level > 5){
      new_enemy("enemy_yellow",1,.25,undefined,game.height);
    }    
 
  }   

  enemies.forEach(function(enemy){
    if(game.time.now > enemy.shootTime && !enemy.boss){
      if(enemy.rear){
        shoot(enemy,-5,"enemy-bullet");
      }else{
        shoot(enemy,10,"enemy-bullet");
      }
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

  if(typeof x === 'undefined'){
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
  enemy.alive = true;
  //set number of hit need to kill
  enemy.life = life;

  //set enemy speed between 
  enemy.speed = Math.floor(Math.random() * 300) + 100;
  if(type == "enemy_blue"){
    enemy.body.velocity.x = Math.floor(Math.random() * 30) + 10;
  }else if(type == "enemy_green"){
    enemy.position.y = game.world.randomY / 2;
    var i = Math.floor(Math.random() * 2);
    var velx = Math.floor(Math.random() * 50) + 10;
    enemy.speed = 10;
    if(i == 1){
      enemy.position.x = game.width;
      enemy.body.velocity.x = -velx;
    }else{
      enemy.position.x = 0;
      enemy.body.velocity.x = velx;
    }

  }else if(type == "enemy_yellow"){
    enemy.rear = true;
    enemy.speed = enemy.speed * -1;
  }

  enemy.body.velocity.y = enemy.speed;
  enemy.ship = true;
   
  if(type.indexOf("boss")>=0){
    enemy.boss = true;
    music.fadeOut(4000);
    //  Play some boss music
    music_boss = game.add.audio('music_boss');
    music_boss.fadeIn(4000);
    music_boss.loop = true;

  };

  //set random shoot time for enemy
  enemy.shootTime = game.time.now + Math.floor(Math.random() * enemy_wait1) + 1000;

  //set delay for next enemy between 1 and 3 seconds
  //And speed up as time goes on
  var delay = Math.floor(Math.random() * enemy_wait1) + enemy_wait2
  if(enemy_wait1 > 2000){
    enemy_wait1-=10
    enemy_wait2-=10
  }else if(enemy_wait1 < 2000 && level > 5){
    enemy_wait1 = 8000
    enemy_wait2 = 4000   
  }

  enemy_timer = game.time.now + delay

}

function enemy_death(enemy){
  if(enemy.boss && enemy.life == 0){
    levelTime = game.time.now + 240000;
    enemy.life = -1;
    boss_death(enemy);
  }else{
    explosion(enemy);
    enemy.destroy();
    enemies_killed+=1;
    if(enemies_killed%50 == 0){
      message("excellent");
      bonus_points(25);
    }else if(enemies_killed%10 == 0){
      message("kill_bonus");
      bonus_points(10);
    }

    score+=10;
  }
}

function boss_death(boss){
  explosion(boss,undefined,5);
  game.time.events.add(2000, boss_destroy,boss);
 
  music_boss.fadeOut(1000);
  for(var i = 0;i<15;i++){
    var size = Math.floor(Math.random() * 4) + 1;
    var x = game.world.randomX;
    var y = game.world.randomY/4;

    game.time.events.add(100 * i, explosion, undefined,undefined,undefined,size,x,y);
  }

  level+=1 //move to next level
  //slow enemy attacks for a little
  enemy_wait1 = 4000;
  enemy_wait2 = 2000;
}

function boss_destroy(boss){
  this.destroy();
  if(!music.isPlaying){
    music_boss.destroy();
    //  music.destroy();
    music.fadeIn(4000); 
  }

  bonus_points(50);
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
  if(game.time.now > boss.shootTime){
    shoot(boss,10,"enemy-bullet",5);
    boss.shootTime = game.time.now + Math.floor(Math.random() * enemy_wait1) + 1000;
  }


}
