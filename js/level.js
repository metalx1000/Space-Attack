function preload_level(){
  game.load.image('stars', 'res/images/stars.png');

  game.load.audio('music', [ 'res/music/music1.wav', 'res/music/music1.ogg', 'res/music/music1.mp3']);
}

function create_level(){
  stars = game.add.tileSprite(0, 0, game.width, game.height, 'stars');

  //  Play some music
  music = game.add.audio('music');
  music.play('',0,1,true);

  // start fullscreen on click
  game.input.onDown.add(go_fullscreen, this);
}

function update_level(){
  stars.tilePosition.y += 2;
}

function go_fullscreen(){
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.startFullScreen();
}

