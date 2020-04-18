let game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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

function update() { }


function preload() {
  this.load.image('villager', 'assets/villager.png')
}

function create() {
  villagers = this.physics.add.group({
    key: 'villager',
    repeat: 10,
    setXY: { x: 10, y: 0, stepX: 100 }
  })

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
}
