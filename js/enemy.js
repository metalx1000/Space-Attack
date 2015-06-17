var enemy_timer;

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
      shoot(enemy,5,"enemy-bullet");
      enemy.shootTime = game.time.now + Math.floor(Math.random() * 5000) + 1000;
    }
  });
}

function new_enemy(){
  //set enemy speed between 5,000 and 10,000
  var speed = Math.floor(Math.random() * 10000) + 5000;
  var enemy = enemies.create(game.world.randomX,-128,'enemy');
  enemy.scale.setTo(.5,.5);
  enemy.anchor.setTo(.5,.5);
  game.add.tween(enemy).to({y: game.world.height+256}, speed, "Linear", true);
  enemy.ship = true;

  //set random shoot time for enemy
  enemy.shootTime = game.time.now + Math.floor(Math.random() * 5000) + 1000;
  //set delay for next enemy between 1 and 3 seconds
  var delay = Math.floor(Math.random() * 3000) + 1000
  enemy_timer = game.time.now + delay

}

