

class letter {
    constructor(game, x, y, sym) {
        Object.assign(this, {game, x,y})
        this.symbol = sym;
        this.location;   
        this.player; //true if player is in control of letterblock
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/lettersdarkmode.png");
        if(lightmode) {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/letterslightmode.png");
        };
        
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 17, 19, 76, 83, x, y );
        ctx.drawImage(this.spritesheet, 76, 83, 17, 19, x, y );
    };

};