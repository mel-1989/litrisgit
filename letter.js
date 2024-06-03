

class letter {
    constructor(game, x, y, sym) {
        this.game = game
        this.x = x
        this.y = y
        this.symbol = sym;
        this.location;   
        this.player; //true if player is in control of letterblock
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/lettersdarkmode.png");
        if(lightmode) {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/letterslightmode.png");
        };
        
    };

    update() {
        const movespeed = 4;
        //gravity
        

        if(this.game.left){
            this.x-= movespeed;
        };
        if(this.game.right){
            this.x+= movespeed;
        };
        if(this.game.down){
            this.y+= movespeed;
        };
        if(this.game.up){
            this.y-= movespeed;
        };
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 17, 19, 76, 83, this.x, this.y, 76, 83);
    };

};