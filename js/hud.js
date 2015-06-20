function preload_hud(){
  game.load.image('player_death','res/images/hud_player_death.png');
}

function create_hud(){
  msgs = game.add.group();
}

function update_hud(){
  destroy_messages();
}

function message(msg){
  //destroy any exisiting messages
  destroy_messages();

  //display new message
  msg = msgs.create(game.width/2,game.height/2,msg); 
  msg.anchor.setTo(.5,.5);

  //set timeout for msg
  msg.timeout = game.time.now + 3000;
}

function destroy_messages(){
  msgs.forEach(function(msg){
    if(game.time.now > msg.timeout){
      msg.destroy();
    }
  });
}
