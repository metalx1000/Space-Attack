var power_delay;

function create_powerup(){
  power_delay = game.time.now + 15000;
  powerups = game.add.group();
  powerups.enableBody = true;
  wingmen = game.add.group();
  motherShip = game.add.group();
  powerup_list = ["missile2","wingman","wingman2","invincibility","diagonal_gun","rapid_fire",
    "powerUpPlus","diagonal_gun2", "diagonal_gun3", "escape"];
}

function update_powerup(){
  if(game.time.now > power_delay){
    randomPowerUp(); 
  }

  //if player collects powerup
  game.physics.arcade.overlap(powerups, player, collect_powerup, null, this);

  wingmen.forEach(function(wingman){
    if(game.time.now > wingman.shootTime){
      wingman.shootTime += 300;
      wingman_shoot(wingman);
    }
    if(game.time.now > wingman.deathTime){
      wingman.destroy();
    }
  });

  motherShip.forEach(function(mother){
    if(mother.alive && game.time.now >  mother.timeout){
      mother_attack(mother);
    }
    
    if(mother.alive && game.time.now > mother.deathTime){
      motherShip_death(mother);
    }
  });
  
  if(game.time.now > player.rapidTime && player.alive){
    rapid_fire();
  }
  
  if(game.time.now > player.escapeTimeout && player.shoot == false){
    endEscape();
  }
}

function new_powerup(type){
  var i = Math.floor(Math.random() * 15000) + 5000;
  power_delay = game.time.now + i;
  var y = game.world.randomY / 2;
  var vely = Math.floor(Math.random() * 100) + 150;
  var x = Math.floor(Math.random() * 2);
  if(x == 1){
    var x = game.width;
    var velx = (Math.floor(Math.random() * 30) + 50) * -1;
  }else{
    var x = 0;
    var velx = Math.floor(Math.random() * 30) + 50;
  }

  var powerup = powerups.create(x,y,type);
  powerup.anchor.setTo(0.5,0.5);
  powerup.body.velocity.x = velx;
  powerup.body.velocity.y = vely;
  powerup.type = type;

  //set death after 1 minute
  game.time.events.add(Phaser.Timer.SECOND * 60, kill_powerup, this, powerup);
  
}

function kill_powerup(powerup){
  powerup.kill();
}

function collect_powerup(player,powerup){
  if(powerup.type == "missile2"){
    megaDetination();
  }else if(powerup.type == "wingman"){
    var snd = game.add.audio(powerup.type);
    snd.play();
    mother_ship();
  }else if(powerup.type == "invincibility"){
    player_invincible(player,true,10,true);
  }else if(powerup.type == "diagonal_gun"){
    player.weapon = "diagonal_gun";
    message("hud_diagonal_gun");
    var snd = game.add.audio("powerup");
    snd.play();
  }else if(powerup.type == "diagonal_gun2"){
    player.weapon = "diagonal_gun2";
    player.plasma = true;
    message("hud_diagonal_gun");
    var snd = game.add.audio("powerup");
    snd.play();
  }else if(powerup.type == "diagonal_gun3"){
    player.weapon = "diagonal_gun3";
    player.plasma = true;
    message("hud_diagonal_gun");
    var snd = game.add.audio("powerup");
    snd.play();
  }else if(powerup.type == "wingman2"){
    message("hud_wingman2");
    var snd = game.add.audio("powerup");    
    snd.play();
    wingman_backup();
  }else if(powerup.type == "rapid_fire"){
    message("hud_" + powerup.type);
    var snd = game.add.audio(powerup.type);
    snd.play();
    player.rapid = 100;
    player.rapidTime = game.time.now;
  }else if(powerup.type == "powerUpPlus"){
    var snd = game.add.audio("powerup");    
    snd.play();
    for(var i=0;i<3;i++){
      randomPowerUp();
    }
  }else if(powerup.type == "escape"){
    escape();
  }

  kill_powerup(powerup);
}

function randomPowerUp(){
  var powerup = powerup_list[Math.floor(Math.random()*powerup_list.length)];
  new_powerup(powerup);   
}

function bonus_points(amount){
  if(typeof amount === 'undefined'){amount = 20}
  var s = 0;
  var points = setInterval(function(){
    s+=1
    score+=10;
    var point = game.add.audio("coin10");
    point.volume = .2;
    point.play();
    if(s >= amount){clearInterval(points)};
  },100,s);

}

function mother_ship(){
  message("hud_mother_ship");
  mother = motherShip.create(game.width/2,game.height+512,"player");
  mother.anchor.setTo(.5,.5);
  mother.scale.setTo(5,5);

  //shoot position
  mother.sx = -40;
  mother.timeout = game.time.now + 2000; 
  mother.deathTime = game.time.now + 10000;
  //bring ship onto screen
  var tween = game.add.tween(mother);
  tween.to({ y: game.height }, 2000);
  tween.onComplete.add(mother_attack,this,mother);
  tween.start();

  //animate random left/right movements
  mother.tween = setInterval(function(){  
    var tween = game.add.tween(mother);
    var x = game.width/2 + (Math.floor(Math.random() * 200) -200) + 100;
    tween.to({ x: x}, 500, Phaser.Easing.Linear.None);
    tween.start();
  },500);


}

function motherShip_death(mother){
  mother.alive = false;
  var tween = game.add.tween(mother);
  tween.to({ y: game.height + 512 }, 2000);
  tween.start();
  tween.onComplete.add(function(mother){
    bonus_points(20);
    mother.destroy();
  },this,mother);  
}

function mother_attack(mother){
  var y = game.height - 256;
  mother.timeout += 100;
  mother.sx +=50;
  x = mother.sx;
  if(x > game.width){
    mother.sx = -40;
  }  
  shoot(undefined,-5,"player-bullet",2,x,y);
  
}

function wingman_backup(type,size){
  if(typeof type === 'undefined'){type = 'player'}
  if(typeof size === 'undefined'){size = .5}
  for(var i = 128;i<game.width;i+=128){
    var wingman = wingmen.create(i,game.height + 256,type);
    wingman.anchor.setTo(.5,.5);
    wingman.scale.setTo(size,size);
    game.physics.enable(wingman, Phaser.Physics.ARCADE);
    wingman.body.velocity.y = -300;
    wingman.deathTime = game.time.now + 6000;
    wingman.shootTime = game.time.now + 300;
  } 
}

function wingman_shoot(wingman){
  shoot(wingman,-2,"player-bullet",undefined,undefined,undefined,0);
  shoot(wingman,-2,"player-bullet",undefined,undefined,undefined,20);
  shoot(wingman,-2,"player-bullet",undefined,undefined,undefined,-20);
}

function rapid_fire(){
    if(player.rapid > 0){
      shoot(player,-5,"player-bullet");
      player.rapid -= 1;
      player.rapidTime += 100;
    }
}

function escape(){
    //make player invincible
    player_invincible(player,true,4,false);
    var snd = game.add.audio("escape");
    snd.play();
    
    message("hud_escape",3000);
    
    //set original delay for new enemy spawning
    var enemy_timer = game.time.now + 5000;
    var enemy_wait1 = 5000;
    var enemy_wait2 = 3000;   

    //player animation
    player.shoot = false;
    var playerTurns = game.add.tween(player);
    playerTurns.to({angle:90}, 1000);
    player.escapeTimeout = game.time.now + 2000;
    playerTurns.start();
    
    //move enemies
    enemies.forEach(function(enemy){
      enemy.body.velocity.x = -400;
    });
    
    //move bullets
    enemyBullets.forEach(function(bullet){
      bullet.body.velocity.x = -400;
    });
    
    playerBullets.forEach(function(bullet){
      bullet.body.velocity.x = -400;
    });
    
    stars.movex = true;
}

function endEscape(){
    megaDetination();
    var playerTurns = game.add.tween(player);
    playerTurns.to({angle:0}, 1000);
    playerTurns.start();
    stars.movex = false;
    player.shoot = true;
}

function megaDetination(){
    message("mega1");
    var snd = game.add.audio("mega1");
    snd.play();
    bonus_points(20);
    enemies.forEach(function(enemy){
      if(!enemy.boss){
        var i = Math.floor(Math.random() * 300) + 100;
        game.time.events.add(i , enemy_death, this, enemy);
      }
    });
}
