class wall {
    constructor(game, xgrid, ygrid, EntityStructure, direction){
        this.xgrid = xgrid;
        this.ygrid = ygrid;
        this.EntityStructure = EntityStructure;
        

        this.game = game;
        this.dimension = 64;
        this.direction = direction; //'left' and 'right' are valid
        this.player = false;
        this.symbol = '0'


        this.spritesheet = ASSET_MANAGER.getAsset('sprites/asgorescastlesprites.png');
        console.log(this.spritesheet);
    }

    update(){
        //this.EntityStructure[this.ygrid][this.xgrid] = this;
    };

    draw(ctx){
        if(this.direction == 'left'){
            ctx.drawImage(this.spritesheet, 385, 64, 19, 19, this.xgrid*64, this.ygrid*64, 64,64);
        };
        if(this.direction == 'right'){
            ctx.drawImage(this.spritesheet, 427, 64, 19, 19, this.xgrid*64, this.ygrid*64, 64, 64);
        };
        
    };

    toString(){
        return this.symbol;
    }
}