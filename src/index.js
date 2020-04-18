let game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  pixelArt: true,
  zoom: 2,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 300
      },
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
});

let villagers;
let ground;

function update() { }


function preload() {
  this.load.image('villager', 'assets/villager.png')
  this.load.image('platform', 'assets/platform.png')
}

function create() {
  villagers = this.physics.add.group({
    key: 'villager',
    repeat: 10,
    setXY: { x: 10, y: 0, stepX: 10 }
  })

  // ground = this.physics.add.staticGroup()

  // // ground[0].setScale(3).refreshBody()
  // ground.create(0, 580, 'platform').setScale(2).refreshBody();
  // ground.children.iterate((platform) => {
  //   // platform.setFrictionY(1)
  // })

  villagers.children.iterate((villager) => {
    villager.setCollideWorldBounds(true)
    villager.setInteractive({ draggable: true })

    let prevDragX = 0;
    let prevDragY = 0;
    let dragDeltaX = 0;
    let dragDeltaY = 0;

    villager.on("dragstart", (pointer, dragX, dragY) => {
      villager.body.setAllowGravity(false);
      prevDragX = dragX;
      prevDragY = dragY;
    });

    villager.on("drag", (pointer, dragX, dragY) => {
      villager.x = dragX;
      villager.y = dragY;
      dragDeltaX = dragX - prevDragX;
      dragDeltaY = dragY - prevDragY;
      prevDragX = dragX;
      prevDragY = dragY;
    });

    villager.on("dragend", () => {
      villager.body.setAllowGravity(true);
      villager.body.setVelocity(dragDeltaX * 50, dragDeltaY * 50);
    });
  })

  // this.physics.add.collider(villagers, ground)
}
