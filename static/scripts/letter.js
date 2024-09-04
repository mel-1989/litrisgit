class letter {
  constructor(game, xgrid, ygrid, EntityStructure, sym) {
    this.game = game;
    this.xgrid = xgrid;
    this.ygrid = ygrid;
    this.EntityStructure = EntityStructure;
    //console.log("arghghg:"+ this.EntityStructure);

    this.dimension = 64; //size and width

    this.symbol = sym;
    this.sheet;
    this.supported;
    this.player = 1; //1 if player is in control of letterblock, 0 if not, 2 if stored.

    this.moveDelay = 200; // Delay in milliseconds
    this.lastMoveTime = Date.now(); // Track the last move time

    this.fallframe = true;

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/lettersbright3.png"); //./sprites/lettersbright.png
  }

  /*get xgrid()
        return Math.floor(this.x / 64); // Calculate xprime based on x
    }
    get ygrid() {
        return Math.floor(this.y / 64); // Calculate xprime based on x
    }*/

  update() {
    if (this.player == 1) {
      if (this.game.misc) {
        this.player = 2;
      }
    }

    // Get the current time
    const currentTime = Date.now();

    // Check if enough time has passed since the last move
    if (currentTime - this.lastMoveTime >= this.moveDelay) {
      // Perform the move
      this.EntityStructure[this.ygrid][this.xgrid] = 0;
      this.move();
      // Update the last move time
      this.lastMoveTime = currentTime;
    }
    this.EntityStructure[this.ygrid][this.xgrid] = this;
  }

  move() {
    let collision = false;
    const currentx = this.xgrid;
    const currenty = this.ygrid;

    let newX = this.xgrid;
    let newY = this.ygrid;

    //gravity
    if (this.fallframe) {
      newY = this.ygrid + 1;
      this.fallframe = false;
    } else {
      this.fallframe = true;
    }

    if (this.player == 1) {
      // Check for movement and update the position
      if (this.game.left || this.game.leftframe) {
        newX -= 1;
      }
      if (this.game.right || this.game.rightframe) {
        newX += 1;
      }
      if (this.game.up || this.game.upframe) {
        newY -= 1;
      }
      if (this.game.X) {
        for (let j = 17; j >= currenty; j--) {
          if (this.EntityStructure[j][currentx] === 0) {
            this.ygrid = j;
            this.EntityStructure[this.ygrid][this.xgrid] = this;
            collision = true;
            break;
          }
        }
      }
    }

    for (const other of this.game.entities) {
      if (collision) {
        break;
      }
      if (other !== this && newX === other.xgrid && newY === other.ygrid) {
        collision = true;
        break;
      }
    }

    if (!collision) {
      //will need to be refined so that box can still move when collision occurs in one direction
      this.xgrid = newX;
      this.ygrid = newY;
    }
    if (collision) {
      this.player = 0;
      this.draw(this.game.ctx);
      this.spritesheet = ASSET_MANAGER.getAsset(
        "./sprites/letterslightmode.png",
      );
    }
  }

  draw(ctx) {
    //symbol logic needed
    var mymap = this.createsymbolmap();
    ctx.drawImage(
      this.spritesheet,
      mymap.get(this.symbol)[1],
      mymap.get(this.symbol)[0],
      110,
      120,
      64 * this.xgrid,
      64 * this.ygrid,
      64,
      64,
    );
  }

  toString() {
    return this.symbol;
  }

  createsymbolmap() {
    const mymap = new Map();

    mymap.set(String.fromCharCode(97), [1, 1]); // a
    mymap.set(String.fromCharCode(98), [1, 111]); // b
    mymap.set(String.fromCharCode(99), [1, 221]); // c
    mymap.set(String.fromCharCode(100), [1, 331]); // d
    mymap.set(String.fromCharCode(101), [1, 441]); // e
    mymap.set(String.fromCharCode(102), [1, 551]); // f
    mymap.set(String.fromCharCode(103), [1, 661]); // g
    mymap.set(String.fromCharCode(104), [1, 771]); // h
    mymap.set(String.fromCharCode(105), [1, 881]); // i
    mymap.set(String.fromCharCode(106), [121, 1]); // j
    mymap.set(String.fromCharCode(107), [121, 111]); // k
    mymap.set(String.fromCharCode(108), [121, 221]); // l
    mymap.set(String.fromCharCode(109), [121, 331]); // m
    mymap.set(String.fromCharCode(110), [121, 441]); // n
    mymap.set(String.fromCharCode(111), [121, 551]); // o
    mymap.set(String.fromCharCode(112), [121, 661]); // p
    mymap.set(String.fromCharCode(113), [121, 771]); // q
    mymap.set(String.fromCharCode(114), [121, 881]); // r
    mymap.set(String.fromCharCode(115), [241, 1]); // s
    mymap.set(String.fromCharCode(116), [241, 111]); // t
    mymap.set(String.fromCharCode(117), [241, 221]); // u
    mymap.set(String.fromCharCode(118), [241, 331]); // v
    mymap.set(String.fromCharCode(119), [241, 441]); // w
    mymap.set(String.fromCharCode(120), [241, 551]); // x
    mymap.set(String.fromCharCode(121), [241, 661]); // y
    mymap.set(String.fromCharCode(122), [241, 771]); // z

    return mymap;
  }
}
