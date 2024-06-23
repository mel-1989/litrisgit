

class letter {
    constructor(game, xgrid, ygrid, sym) {
        this.game = game;
        this.xgrid = xgrid;
        this.ygrid = ygrid;

        this.dimension = 64; //size and width

        this.symbol = sym;
        this.supported;
        this.player = true; //true if player is in control of letterblock

        this.moveDelay = 300; // Delay in milliseconds
        this.lastMoveTime = Date.now(); // Track the last move time

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/lettersdarkmode.png");
        if(lightmode) {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/letterslightmode.png");
        };
        
    };

    /*get xgrid() {
        return Math.floor(this.x / 64); // Calculate xprime based on x
    }
    get ygrid() {
        return Math.floor(this.y / 64); // Calculate xprime based on x
    }*/



    update() {    
        // Get the current time
        const currentTime = Date.now();

        // Check if enough time has passed since the last move
        if (currentTime - this.lastMoveTime >= this.moveDelay) {
            // Perform the move
            this.move();
            // Update the last move time
            this.lastMoveTime = currentTime;
        }

        
    };

    move(){
        const currentx = this.xgrid;
        const currenty = this.ygrid;
            
        let newX = this.xgrid;
        let newY = this.ygrid;


        //gravity
        newY = this.ygrid + 1;
        if(this.player){
            // Check for movement and update the position
            if (this.game.left) {
                newX -= 1;
            };
            if (this.game.right) {
                newX += 1;
            };
            if (this.game.down) {
                newY += 1;
            };
            if (this.game.up) {
                newY -= 1;
            };
        };
        //check new collision
       /* const newBox = { 
            x: newX,
            y: newY,
            width: this.dimension,
            height: this.dimension
        };*/

        let collision = false;
        for (const other of this.game.entities) {
            /*const otherBox = { 
                x: other.x,
                y: other.y,
                width: other.dimension,
                height: other.dimension
            };*/
            if (other !== this && newX === other.xgrid && newY === other.ygrid) {
                collision = true;
                break;
            };
        };

        if (!collision) { //will need to be refined so that box can still move when collision occurs in one direction
            this.xgrid = newX;
            this.ygrid = newY;
        };
        if(collision) {
            this.player = false;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/letterslightmode.png");
        };
    }

    getBoundingBox() {
        return {
            x: this.x,
            y: this.y,
            width: this.dimension,
            height: this.dimension
        };
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 17, 19, 76, 83, 64*this.xgrid, 64*this.ygrid, 64, 64);
    };

    isColliding(other) {
        const otherBox = { 
            x: other.x,
            y: other.y,
            width: other.dimension,
            height: other.dimension
        };
        return this.isCollidingWithBox(this.getBoundingBox(), otherBox);
    };

    isCollidingWithBox(box1, box2) {
        return ( //console.log(box1.x  + ' ' + box1.width + ' ' + box2.x + ' ' + box1.width)
            box1.x <= box2.x + box2.width &&
            box1.x + box1.width >= box2.x &&
            box1.y <= box2.y + box2.height &&
            box1.y + box1.height >= box2.y
        );
    };
};