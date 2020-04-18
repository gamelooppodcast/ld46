let game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  zoom: 2,
  pixelArt: true,
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
let monsters;

function update() { }

function preload() {
  this.load.spritesheet('villager', 'assets/villager.png', { frameWidth: 16, frameHeight: 32 })
  this.load.image('sky', 'assets/sky.png')
  this.load.image('monster', 'assets/monster.png')

  this.load.atlas('stone_house_1', 'assets/buildings.png', 'assets/buildings.json');
}

function create() {
  let sky = this.add.image(0, 0, "sky");
  sky.setOrigin(0, 0);

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("villager", { start: 0, end: 1 }),
    frameRate: 2,
    repeat: -1,
  });

  let house = this.add.image(200, 270, "buildings", "House");

  monsters = this.physics.add.group({
    key: 'monster',
    repeat: 1,
    setXY: { x: 10, y: 0, stepX: 100 }
  })

  villagers = this.physics.add.group({
    key: 'villager',
    repeat: 10,
    setXY: { x: 10, y: 0, stepX: 100 }
  })

  monsters.children.iterate((monster) => {
    monster.setCollideWorldBounds(true)
  });

  villagers.children.iterate((villager) => {
    villager.setCollideWorldBounds(true)
    villager.setInteractive({ draggable: true })
    villager.anims.play("idle", true);

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

    if (Math.random() > 0.5) {
      villager.flipX = true;
    }
  })
}
