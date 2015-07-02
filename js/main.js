var game = new Phaser.Game(720, 1280, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update});
var centerx = game.width / 2;
var centery = game.height / 2;
var level = 0;

function preload() {
  preload_level();
  preload_weapons();
  preload_hud();
  preload_sounds();
}

function create() {
  create_level();
  create_player();
  create_enemy();
  create_weapons();
  create_hud();
  create_powerup();
  create_controls();
}

function update(){
  //wait for larger files to finish loading before starting game
  if (this.cache.isSoundDecoded('music')
  && this.cache.isSoundDecoded('music_boss')){
    update_level();
    update_player();
    update_enemy();
    update_weapons();
    update_hud();
    update_powerup();
    update_controls();
  }else if(typeof load_msg === 'undefined'){
    load_msg = true;
    message('loading',100);
  }
}


