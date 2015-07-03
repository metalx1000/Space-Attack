function preload_hud(){
  game.load.image('player_death','res/images/hud_player_death.png');
  game.load.image('kill_bonus','res/images/hud_kill_bonus.png');
  game.load.image('excellent','res/images/hud_excellent.png');
  game.load.image('mega1','res/images/hud_mega1.png');
  game.load.image('hud_mother_ship','res/images/hud_mother_ship.png');
  game.load.image('hud_invincibility','res/images/hud_invincibility.png');
  game.load.image('hud_diagonal_gun','res/images/hud_diagonal_gun.png');
  game.load.image('hud_wingman2','res/images/hud_wingman2.png');
  game.load.image('hud_rapid_fire','res/images/hud_rapid_fire.png');
  game.load.image('hud_gamepad','res/images/hud_gamepad.png');
  game.load.image('hud_mouse_disabled','res/images/hud_mouse_disabled.png');
  game.load.image('hud_escape','res/images/hud_escape.png');

  game.load.spritesheet('loading', 'res/sprites/hud_loading.png', 446, 81);
}

function create_hud(){
  msgs = game.add.group();
  textGroup = game.add.group();
  new_text("Score: " + score);
  new_text("Kills: " + enemies_killed);
  new_text("Deaths: " + player_deaths);
}

function update_hud(){
  messages_timeout();
  textGroup.children[0].text="Score: " + score;
  textGroup.children[1].text="Kills: " + enemies_killed;
  textGroup.children[2].text="Deaths: " + player_deaths;
}

function message(msg,timeout){
  //if timeout not set, default to 3 seconds
  if(typeof timeout === 'undefined'){timeout = 3000}
  if(typeof animation === 'undefined'){animation = false}
  //destroy any exisiting messages
  destroy_messages();

  //display new message
  msg = msgs.create(game.width/2,game.height/2,msg); 
  msg.anchor.setTo(.5,.5);

  //if animation is true then animate it
  msg.animations.add('ani');
  msg.animations.play('ani', 3, true)
  //set timeout for msg
  msg.timeout = game.time.now + timeout;
}

function destroy_messages(){
  msgs.forEach(function(msg){
    msg.destroy();
  });
}

function messages_timeout(){
  msgs.forEach(function(msg){
    if(game.time.now > msg.timeout){
      msg.destroy();
    }
  });
}

function new_text(txt){
  var size = 50;
  var pos = textGroup.children.length * size;
  var text = textGroup.add(game.make.text(10, pos, txt));

  //  Center align
  //text.anchor.set(0.5);
  //text.align = 'center';

  //  Font style
  text.font = 'Arial Black';
  text.fontSize = size;
  text.fontWeight = 'bold';

  //  Stroke color and thickness
  text.stroke = '#000000';
  text.strokeThickness = 6;
  text.fill = '#43d637';
}


