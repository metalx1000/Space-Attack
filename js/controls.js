function create_controls(){
  //add input for touch screen use
  game.input.addPointer();
  
  if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected) {
    message("hud_gamepad",3000);
    setTimeout(function(){
      message("hud_mouse_disabled",3000);
    },3000)
  }
}