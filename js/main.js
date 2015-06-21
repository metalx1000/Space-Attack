var game = new Phaser.Game(720, 1280, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update});
var centerx = game.width / 2;
var centery = game.height / 2;

function preload() {
  preload_level();
  preload_player();
  preload_enemy();
  preload_weapons();
  preload_hud();
}

function create() {
  create_level();
  create_player();
  create_enemy();
  create_weapons();
  create_hud();
}

function update(){
  if (this.cache.isSoundDecoded('music')){
    update_level();
    update_player();
    update_enemy();
    update_weapons();
    update_hud();
  }else if(typeof load_msg === 'undefined'){
    load_msg = true;
    message('loading',100);
  }
}


