var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});
var centerx = game.width / 2;
var centery = game.height / 2;

function preload() {
  preload_level();
}

function create() {
  create_level();
}

function update(){
  update_level();
}


