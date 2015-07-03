var levelTime;
function preload_level(){
  game.load.image('stars', 'res/images/stars.png');

  game.load.audio('music', [ 'res/music/music1.wav', 'res/music/music1.ogg', 'res/music/music1.mp3']);
  game.load.audio('music_boss', [ 'res/music/music_boss.wav', 'res/music/music_boss.ogg', 'res/music/music_boss.mp3']);
}

function create_level(){
  stars = game.add.tileSprite(0, 0, game.width, game.height, 'stars');
  levelTime = game.time.now + 240000;

  //  Play some music
  music = game.add.audio('music');
  music.play();
  music.loop = true;
  // start fullscreen on click
  game.input.onDown.add(go_fullscreen, this);
}

function update_level(){
  stars.tilePosition.y += 2;

  if(stars.movex){
    stars.tilePosition.x -= 4;
  }
}

function go_fullscreen(){
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.startFullScreen();
}

