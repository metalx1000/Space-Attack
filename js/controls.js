var pad1;
var pad1Active = false;

function create_controls(){
  //add input for touch screen use
  game.input.addPointer();
  
  //add game controller
  game.input.gamepad.start();
  pad1 = game.input.gamepad.pad1;
}

function update_controls(){
  //follow cursor if no gamepad
  if(!pad1Active){
    game.physics.arcade.moveToPointer(player, 400);
    
    //stop movement when player reaches cursor
    if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
    {
        player.body.velocity.setTo(0, 0);
    }

  }
  
  //check for gamepad
  if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected && !pad1Active) {
    pad1Active = true;
    player.body.velocity.setTo(0, 0);
    console.log("GamePad Detected");
    message("hud_gamepad",3000);
    setTimeout(function(){
      message("hud_mouse_disabled",3000);
    },3000)
  } 
}