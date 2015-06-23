function preload_sounds(){
  //sounds
  var sounds = ["coin10","explosion1","explosion2","hit","laser1","laser2"];
  sounds.forEach(function(snd){
    game.load.audio(snd,['res/sounds/'+snd+'.wav','res/sounds/'+snd+'.ogg','res/sounds/'+snd+'.mp3']);
  });

  //sprites
  var sprites = [
    "boss_blue",
    "boss_red",
    "bullet",
    "enemy_blue",
    "enemy-bullet",
    "enemy_green",
    "enemy",
    "explode",
    "hud_loading",
    "player"
  ];

  sprites.forEach(function(sprite){
    game.load.image(sprite,'res/sprites/'+sprite+'.png');
  });

}
