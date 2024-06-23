class wall {
    constructor(game, xgrid, ygrid, direction){
        this.xgrid = xgrid;
        this.ygrid = ygrid;
        this.game = game;
        this.dimension = 64;
        this.direction = direction; //'left' and 'right' are valid
        this.player = false;


        this.spritesheet = ASSET_MANAGER.getAsset('sprites/asgorescastlesprites.png');
        console.log(this.spritesheet);
    }

    getBoundingBox() {
        return {
            x: this.x,
            y: this.y,
            width: this.dimension,
            height: this.dimension
        };
    }

    isColliding(other) {
        const box1 = this.getBoundingBox();
        const box2 = other.getBoundingBox();

        return (
            box1.x < box2.x + box2.width &&
            box1.x + box1.width > box2.x &&
            box1.y < box2.y + box2.height &&
            box1.y + box1.height > box2.y
        );
    };

    update(){

    };

    draw(ctx){
        if(this.direction == 'left'){
            ctx.drawImage(this.spritesheet, 385, 64, 19, 19, this.xgrid*64, this.ygrid*64, 64,64);
        };
        if(this.direction == 'right'){
            ctx.drawImage(this.spritesheet, 427, 64, 19, 19, this.xgrid*64, this.ygrid*64, 64, 64);
        };
        
    };
}