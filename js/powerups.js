var power_delay;

function create_powerup(){
  power_delay = game.time.now + 60000 * 20;
  powerups = game.add.group();
  powerups.enableBody = true;
}

function update_powerup(){
  if(level < 3 && game.time.now > power_delay){
    new_powerup("missile2");   
  }
}

function new_powerup(type){
  var i = Math.floor(Math.random() * 2) + 1;
  power_delay = game.time.now + 60000 * i;
  var y = game.world.randomY / 2;
  var vely = 100;
  if(i == 1){
    var x = game.width;
    var velx = -30;
  }else{
    var x = 0;
    var velx = 30;
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
  powerup.destroy();
}
