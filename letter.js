

class letter {
    constructor(game, x, y, sym) {
        this.game = game
        this.x = x
        this.y = y

        this.dimension = 85; //size and width

        this.symbol = sym;
        this.supported;
        this.player; //true if player is in control of letterblock?


        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/lettersdarkmode.png");
        if(lightmode) {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/letterslightmode.png");
        };
        
    };

    update() {
        const movespeed = 4;
        fallspeed = 2;
        const currentx = this.x;
        const currenty = this.y;
        
        let newX = this.x;
        let newY = this.y;
        

        //gravity
        newY = this.y - fallspeed;
        

        // Check for movement and update the position
        if (this.game.left) {
            newX -= movespeed;
        }
        if (this.game.right) {
            newX += movespeed;
        }
        if (this.game.down) {
            newY += movespeed;
        }
        if (this.game.up) {
            newY -= movespeed;
        }

        //check new collision
        const newBox = { 
            x: newX,
            y: newY,
            width: this.dimension,
            height: this.dimension
        };

        let collision = false;
        for (const other of this.game.entities) {
            if (other !== this && this.isCollidingWithBox(newBox, other.getBoundingBox())) {
                collision = true;
                break;
            }
        }

        if (!collision) { //will need to be refined so that box can still move when collision occurs in one direction
            this.x = newX;
            this.y = newY;
        }

    };

    getBoundingBox() {
        return {
            x: this.x,
            y: this.y,
            width: this.dimension,
            height: this.dimension
        };
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 17, 19, 76, 83, this.x, this.y, 76, 83);
    };

    isColliding(other) {
        const box1 = this.getBoundingBox();
        const box2 = other.getBoundingBox();

        return (
            box1.x < box2.x + box2.width &&
            box1.x + box1.width > box2.x &&
            box1.y < box2.y + box2.height &&
            box1.y + box1.height > box2.y
        );
    }
};