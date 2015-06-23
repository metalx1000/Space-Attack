function preload_sounds(){
  //sounds
  var sounds = ["coin10","explosion1","explosion2","hit","laser1","laser2"];
  sounds.forEach(function(snd){
    console.log(snd);
    game.load.audio(snd,['res/sounds/'+snd+'.wav','res/sounds/'+snd+'.ogg','res/sounds/'+snd+'.mp3']);
  });
}
